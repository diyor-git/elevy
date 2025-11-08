import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { table } from '@devvai/devv-code-backend';
import type { AdminUser } from '@/types/admin';

interface AdminState {
    isAdmin: boolean;
    adminData: AdminUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    isAdmin: false,
    adminData: null,
    loading: false,
    error: null,
};

// Check if current user is admin
export const checkAdminStatus = createAsyncThunk(
    'admin/checkStatus',
    async (uid: string) => {
        const result = await table.getItems('f3i2sdx0ny0w', {
            query: { _uid: uid },
            limit: 1,
        });

        if (result.items.length > 0) {
            const adminData = result.items[0] as AdminUser;
            return {
                isAdmin: true,
                adminData: {
                    ...adminData,
                    permissions: JSON.parse(adminData.permissions as unknown as string),
                },
            };
        }

        return { isAdmin: false, adminData: null };
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearAdminStatus: (state) => {
            state.isAdmin = false;
            state.adminData = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAdminStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAdminStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.isAdmin = action.payload.isAdmin;
                state.adminData = action.payload.adminData;
            })
            .addCase(checkAdminStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to check admin status';
                state.isAdmin = false;
                state.adminData = null;
            });
    },
});

export const { clearAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;
