import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (params = {}, { rejectWithValue }) => {
  try {
    const data = await api.get('/events', { params });
    return data.events || [];
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const createEvent = createAsyncThunk('events/createEvent', async (eventData, { rejectWithValue }) => {
  try {
    const data = await api.post('/events', eventData);
    return data.event;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/events/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    selectedCategory: 'All',
    searchQuery: '',
    error: null,
  },
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e.id !== action.payload);
      });
  },
});

export const { setSelectedCategory, setSearchQuery } = eventsSlice.actions;
export default eventsSlice.reducer;
