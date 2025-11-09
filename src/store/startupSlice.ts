import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { table } from '@devvai/devv-code-backend';

const STARTUPS_TABLE = 'f3iywu2z198g';
const TEAM_MEMBERS_TABLE = 'f3iywu2wj9q9';
const TASKS_TABLE = 'f3iywu2z162o';
const MESSAGES_TABLE = 'f3iywu2wj9q8';

// Types
export interface Startup {
    _id: string;
    _uid: string;
    name: string;
    tagline: string;
    description: string;
    stage: 'idea' | 'mvp' | 'launched' | 'growth';
    industry: string;
    looking_for: string;
    team_size: number;
    created_at: string;
    updated_at: string;
    status: 'active' | 'paused' | 'completed';
}

export interface TeamMember {
    _id: string;
    _uid: string;
    startup_id: string;
    user_id: string;
    role: string;
    status: 'invited' | 'active' | 'left';
    joined_at: string;
    nda_signed: string;
    nda_signed_at?: string;
}

export interface Task {
    _id: string;
    _uid: string;
    startup_id: string;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done';
    assigned_to?: string;
    priority: 'low' | 'medium' | 'high';
    created_at: string;
    updated_at: string;
}

export interface Message {
    _id: string;
    _uid: string;
    startup_id: string;
    user_id: string;
    content: string;
    created_at: string;
}

interface StartupState {
    startups: Startup[];
    currentStartup: Startup | null;
    teamMembers: TeamMember[];
    tasks: Task[];
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}

const initialState: StartupState = {
    startups: [],
    currentStartup: null,
    teamMembers: [],
    tasks: [],
    messages: [],
    isLoading: false,
    error: null,
};

// Helpers
const getAuthUserId = (): string => {
    const userStr = localStorage.getItem('elevy-auth-storage');
    if (!userStr) throw new Error('User data not found');
    const authData = JSON.parse(userStr);
    const userId = authData.state?.user?.uid;
    if (!userId) throw new Error('User ID not found');
    return userId;
};

// Async Thunks
export const fetchAllStartups = createAsyncThunk(
    'startup/fetchAllStartups',
    async (_, { rejectWithValue }) => {
        try {
            const response = await table.getItems(STARTUPS_TABLE, {
                query: { status: 'active' },
                limit: 100,
                sort: '_id',
                order: 'desc',
            });
            return response.items as Startup[];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMyStartups = createAsyncThunk(
    'startup/fetchMyStartups',
    async (_, { rejectWithValue }) => {
        try {
            const sid = localStorage.getItem('DEVV_CODE_SID');
            if (!sid) throw new Error('Not authenticated');
            const userId = getAuthUserId();
            const response = await table.getItems(STARTUPS_TABLE, {
                query: { _uid: userId },
                limit: 100,
                sort: '_id',
                order: 'desc',
            });
            return response.items as Startup[];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchStartupById = createAsyncThunk(
    'startup/fetchStartupById',
    async (startupId: string, { rejectWithValue }) => {
        try {
            const response = await table.getItems(STARTUPS_TABLE, {
                query: { _id: startupId },
                limit: 1,
            });
            if (!response.items.length) throw new Error('Startup not found');
            return response.items[0] as Startup;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createStartup = createAsyncThunk(
    'startup/createStartup',
    async (
        data: Omit<Startup, '_id' | '_uid' | 'created_at' | 'updated_at' | 'team_size'>,
        { rejectWithValue }
    ) => {
        try {
            const sid = localStorage.getItem('DEVV_CODE_SID');
            if (!sid) throw new Error('Not authenticated');
            const userId = getAuthUserId();

            const now = new Date().toISOString();
            const startupData = {
                _uid: userId,
                ...data,
                team_size: 1,
                created_at: now,
                updated_at: now,
            };

            const result: any = await table.addItem(STARTUPS_TABLE, startupData);

            if (result?._id) {
                await table.addItem(TEAM_MEMBERS_TABLE, {
                    _uid: userId,
                    startup_id: result._id,
                    user_id: userId,
                    role: 'Founder',
                    status: 'active',
                    joined_at: now,
                    nda_signed: 'true',
                    nda_signed_at: now,
                });
            }

            return result as Startup;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateStartup = createAsyncThunk(
    'startup/updateStartup',
    async (
        { startupId, data }: { startupId: string; data: Partial<Startup> },
        { rejectWithValue }
    ) => {
        try {
            const sid = localStorage.getItem('DEVV_CODE_SID');
            if (!sid) throw new Error('Not authenticated');
            const userId = getAuthUserId();

            await table.updateItem(STARTUPS_TABLE, {
                _uid: userId,
                _id: startupId,
                ...data,
                updated_at: new Date().toISOString(),
            });

            const response = await table.getItems(STARTUPS_TABLE, {
                query: { _id: startupId },
                limit: 1,
            });

            return response.items[0] as Startup;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// --- Team Members ---
export const fetchTeamMembers = createAsyncThunk(
    'startup/fetchTeamMembers',
    async (startupId: string, { rejectWithValue }) => {
        try {
            const response = await table.getItems(TEAM_MEMBERS_TABLE, {
                query: { startup_id: startupId },
                limit: 100,
            });
            return response.items as TeamMember[];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const addTeamMember = createAsyncThunk(
    'startup/addTeamMember',
    async (
        { startupId, userId, role }: { startupId: string; userId: string; role: string },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const sid = localStorage.getItem('DEVV_CODE_SID');
            if (!sid) throw new Error('Not authenticated');
            const currentUserId = getAuthUserId();
            const now = new Date().toISOString();

            await table.addItem(TEAM_MEMBERS_TABLE, {
                _uid: currentUserId,
                startup_id: startupId,
                user_id: userId,
                role,
                status: 'invited',
                joined_at: now,
                nda_signed: 'false',
            });

            await dispatch(fetchTeamMembers(startupId));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const signNDA = createAsyncThunk(
    'startup/signNDA',
    async (memberId: string, { rejectWithValue }) => {
        try {
            const sid = localStorage.getItem('DEVV_CODE_SID');
            if (!sid) throw new Error('Not authenticated');
            const userId = getAuthUserId();

            const now = new Date().toISOString();
            await table.updateItem(TEAM_MEMBERS_TABLE, {
                _uid: userId,
                _id: memberId,
                nda_signed: 'true',
                nda_signed_at: now,
                status: 'active',
            });
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// --- Tasks ---
export const fetchTasks = createAsyncThunk(
    'startup/fetchTasks',
    async (startupId: string, { rejectWithValue }) => {
        try {
            const response = await table.getItems(TASKS_TABLE, {
                query: { startup_id: startupId },
                limit: 100,
                sort: '_id',
                order: 'desc',
            });
            return response.items as Task[];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createTask = createAsyncThunk(
    'startup/createTask',
    async (
        { startupId, task }: { startupId: string; task: Omit<Task, '_id' | '_uid' | 'created_at' | 'updated_at'> },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const sid = localStorage.getItem('DEVV_CODE_SID');
            if (!sid) throw new Error('Not authenticated');
            const userId = getAuthUserId();
            const now = new Date().toISOString();

            await table.addItem(TASKS_TABLE, {
                _uid: userId,
                startup_id: startupId,
                ...task,
                created_at: now,
                updated_at: now,
            });

            await dispatch(fetchTasks(startupId));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTask = createAsyncThunk(
    'startup/updateTask',
    async (
        { taskId, startupId, updates }: { taskId: string; startupId: string; updates: Partial<Task> },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const userId = getAuthUserId();
            await table.updateItem(TASKS_TABLE, {
                _uid: userId,
                _id: taskId,
                ...updates,
                updated_at: new Date().toISOString(),
            });
            await dispatch(fetchTasks(startupId));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// --- Messages ---
export const fetchMessages = createAsyncThunk(
    'startup/fetchMessages',
    async (startupId: string, { rejectWithValue }) => {
        try {
            const response = await table.getItems(MESSAGES_TABLE, {
                query: { startup_id: startupId },
                limit: 100,
                sort: 'created_at',
                order: 'asc',
            });
            return response.items as Message[];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'startup/sendMessage',
    async (
        { startupId, content }: { startupId: string; content: string },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const sid = localStorage.getItem('DEVV_CODE_SID');
            if (!sid) throw new Error('Not authenticated');
            const userId = getAuthUserId();

            await table.addItem(MESSAGES_TABLE, {
                _uid: userId,
                startup_id: startupId,
                user_id: userId,
                content,
                created_at: new Date().toISOString(),
            });

            await dispatch(fetchMessages(startupId));
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const startupSlice = createSlice({
    name: 'startup',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.startsWith('startup/') && action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('startup/') && action.type.endsWith('/fulfilled'),
                (state) => {
                    state.isLoading = false;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('startup/') && action.type.endsWith('/rejected'),
                (state, action: any) => {
                    state.isLoading = false;
                    state.error = action.payload || action.error.message;
                }
            )
            // Setters for fulfilled cases

    },
});

export const { clearError, reset } = startupSlice.actions;
export default startupSlice.reducer;
