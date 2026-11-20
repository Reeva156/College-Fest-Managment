import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const checkAdminSetup = createAsyncThunk('auth/checkAdminSetup', async (_, { rejectWithValue }) => {
  try {
    const data = await api.get('/auth/setup-status');
    return data.hasAdmin;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const setupAdmin = createAsyncThunk('auth/setupAdmin', async (adminData, { rejectWithValue }) => {
  try {
    const data = await api.post('/auth/setup-admin', adminData);
    localStorage.setItem('pulse_token', data.token);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const data = await api.post('/auth/login', credentials);
    localStorage.setItem('pulse_token', data.token);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const data = await api.post('/auth/register', userData);
    localStorage.setItem('pulse_token', data.token);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('pulse_token');
    if (!token) return null;
    const data = await api.get('/auth/me');
    return data.user;
  } catch (err) {
    localStorage.removeItem('pulse_token');
    return rejectWithValue(err.message);
  }
});

export const updateUserProfile = createAsyncThunk('auth/updateProfile', async (profileData, { rejectWithValue }) => {
  try {
    const data = await api.put('/auth/profile', profileData);
    if (data.token) {
      localStorage.setItem('pulse_token', data.token);
    }
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const changeUserPassword = createAsyncThunk('auth/changePassword', async (passData, { rejectWithValue }) => {
  try {
    const data = await api.put('/auth/change-password', passData);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('pulse_token') || null,
    hasAdmin: true,
    loading: false,
    checkingSetup: true,
    error: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('pulse_token');
      state.user = null;
      state.token = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(checkAdminSetup.pending, (state) => {
        state.checkingSetup = true;
      })
      .addCase(checkAdminSetup.fulfilled, (state, action) => {
        state.checkingSetup = false;
        state.hasAdmin = action.payload;
      })
      .addCase(checkAdminSetup.rejected, (state) => {
        state.checkingSetup = false;
      })

      .addCase(setupAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setupAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.hasAdmin = true;
      })
      .addCase(setupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.token = null;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (action.payload.token) state.token = action.payload.token;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
