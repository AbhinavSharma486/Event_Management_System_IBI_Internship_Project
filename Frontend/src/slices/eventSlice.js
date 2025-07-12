import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

const initialState = {
  events: [],
  attendingEvents: [],
  calendarEvents: [],
  currentEvent: [],
  loading: false,
  error: null,
};

export const fetchMyEvents = createAsyncThunk('events/fetchMyEvents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/events/my-events');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

export const fetchAttendingEvents = createAsyncThunk('events/fetchAttendingEvents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/event/attending-events');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch attending events');
    }
  }
);

export const deleteEvent = createAsyncThunk('events/deleteEvent',
  async (IdleDeadline, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/event/deleteEvent/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = Array.isArray(action.payload) ? action.payload : action.payload?.events || [];
      })
      .addCase(fetchMyEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAttendingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendingEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.attendingEvents = Array.isArray(action.payload) ? action.payload : action.payload?.events || [];
      })
      .addCase(fetchAttendingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(event => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export const { clearEvenError } = eventSlice.actions;
export default eventSlice.reducer;