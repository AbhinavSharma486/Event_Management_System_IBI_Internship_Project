import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk('auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/auth/login', data);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk('auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/auth/register', data);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/auth/logout');
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const updateProfile = createAsyncThunk('auth/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile updated failed');
    }
  }
);

export const updatePassword = createAsyncThunk('auth/updatePassword',
  async (data, { rejectWithValue }) => {
    try {
      await axiosInstance.put('/auth/update-profile', data);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Passowrd update failed');
    }
  }
);

export const deleteProfile = createAsyncThunk('auth/deleteProfile',
  async (userId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/auth/delete/${userId}`);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Account deletion Failed');
    }
  }
);

export const checkAuth = createAsyncThunk('auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/auth/check', {
        withCredentials: true
      });
      return res.data.user || null;
    } catch (error) {
      return null;
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => [
        state.loading = false,
        state.error = action.payload
      ])
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.currentUser = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;