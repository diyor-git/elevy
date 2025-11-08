import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { dbQuery, dbInsert, dbUpdate } from '@/lib/database';
import type { ForumPost, ForumReply } from '@/types/forum';

interface ForumState {
  posts: ForumPost[];
  currentPost: ForumPost | null;
  replies: ForumReply[];
  loading: boolean;
  error: string | null;
}

const initialState: ForumState = {
  posts: [],
  currentPost: null,
  replies: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchPostsAsync = createAsyncThunk(
  'forum/fetchPosts',
  async ({ category, searchQuery }: { category?: string; searchQuery?: string }) => {
    const conditions: Record<string, any> = {};
    if (category && category !== 'all') {
      conditions.category = category;
    }
    if (searchQuery) {
      conditions.title = { $contains: searchQuery };
    }

    const posts = await dbQuery<ForumPost>('forum_posts', conditions);
    // Sort by pinned first, then by createdAt
    return posts.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
);

export const fetchPostByIdAsync = createAsyncThunk(
  'forum/fetchPostById',
  async (postId: string) => {
    const posts = await dbQuery<ForumPost>('forum_posts', { _id: postId });
    if (posts.length === 0) throw new Error('Post not found');
    
    // Increment view count
    const post = posts[0];
    await dbUpdate('forum_posts', postId, { views: (post.views || 0) + 1 });
    
    return { ...post, views: (post.views || 0) + 1 };
  }
);

export const fetchRepliesAsync = createAsyncThunk(
  'forum/fetchReplies',
  async (postId: string) => {
    const replies = await dbQuery<ForumReply>('forum_replies', { postId });
    return replies.sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
);

export const createPostAsync = createAsyncThunk(
  'forum/createPost',
  async (postData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: { name: string; email: string };
  }) => {
    const newPost = await dbInsert<ForumPost>('forum_posts', {
      ...postData,
      likes: 0,
      likedBy: [],
      replyCount: 0,
      views: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return newPost;
  }
);

export const createReplyAsync = createAsyncThunk(
  'forum/createReply',
  async (replyData: {
    postId: string;
    content: string;
    author: { name: string; email: string };
  }) => {
    const newReply = await dbInsert<ForumReply>('forum_replies', {
      ...replyData,
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Update reply count in post
    const posts = await dbQuery<ForumPost>('forum_posts', { _id: replyData.postId });
    if (posts.length > 0) {
      await dbUpdate('forum_posts', replyData.postId, {
        replyCount: (posts[0].replyCount || 0) + 1,
        updatedAt: new Date().toISOString(),
      });
    }

    return newReply;
  }
);

export const toggleLikePostAsync = createAsyncThunk(
  'forum/toggleLikePost',
  async ({ postId, userId }: { postId: string; userId: string }) => {
    const posts = await dbQuery<ForumPost>('forum_posts', { _id: postId });
    if (posts.length === 0) throw new Error('Post not found');

    const post = posts[0];
    const likedBy = post.likedBy || [];
    const hasLiked = likedBy.includes(userId);

    const updatedLikedBy = hasLiked
      ? likedBy.filter((id) => id !== userId)
      : [...likedBy, userId];

    await dbUpdate('forum_posts', postId, {
      likes: updatedLikedBy.length,
      likedBy: updatedLikedBy,
    });

    return { postId, likes: updatedLikedBy.length, likedBy: updatedLikedBy };
  }
);

export const toggleLikeReplyAsync = createAsyncThunk(
  'forum/toggleLikeReply',
  async ({ replyId, userId }: { replyId: string; userId: string }) => {
    const replies = await dbQuery<ForumReply>('forum_replies', { _id: replyId });
    if (replies.length === 0) throw new Error('Reply not found');

    const reply = replies[0];
    const likedBy = reply.likedBy || [];
    const hasLiked = likedBy.includes(userId);

    const updatedLikedBy = hasLiked
      ? likedBy.filter((id) => id !== userId)
      : [...likedBy, userId];

    await dbUpdate('forum_replies', replyId, {
      likes: updatedLikedBy.length,
      likedBy: updatedLikedBy,
    });

    return { replyId, likes: updatedLikedBy.length, likedBy: updatedLikedBy };
  }
);

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.replies = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      // Fetch post by ID
      .addCase(fetchPostByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch post';
      })
      // Fetch replies
      .addCase(fetchRepliesAsync.fulfilled, (state, action) => {
        state.replies = action.payload;
      })
      // Create post
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      // Create reply
      .addCase(createReplyAsync.fulfilled, (state, action) => {
        state.replies.push(action.payload);
        if (state.currentPost) {
          state.currentPost.replyCount = (state.currentPost.replyCount || 0) + 1;
        }
      })
      // Toggle like post
      .addCase(toggleLikePostAsync.fulfilled, (state, action) => {
        const { postId, likes, likedBy } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.likes = likes;
          post.likedBy = likedBy;
        }
        if (state.currentPost?._id === postId) {
          state.currentPost.likes = likes;
          state.currentPost.likedBy = likedBy;
        }
      })
      // Toggle like reply
      .addCase(toggleLikeReplyAsync.fulfilled, (state, action) => {
        const { replyId, likes, likedBy } = action.payload;
        const reply = state.replies.find((r) => r._id === replyId);
        if (reply) {
          reply.likes = likes;
          reply.likedBy = likedBy;
        }
      });
  },
});

export const { clearCurrentPost, clearError } = forumSlice.actions;
export default forumSlice.reducer;
