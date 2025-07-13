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

export const fetchEventById = createAsyncThunk('events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/event/getSingleEvent/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
    }
  }
);

export const createEvent = createAsyncThunk('events/createEvent',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/event/create-event', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create event');
    }
  });

export const updateEvent = createAsyncThunk('events/updateEvent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/event/updateEvent/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update event');
    }
  });

export const fetchCalendarEvents = createAsyncThunk('events/fetchCalendarEvents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/event/calendar-events');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch calendar events');
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
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentEvent = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentEvent = null;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.unshift(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map(event => event._id === action.payload._id ? action.payload : event);
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.calendarEvents = Array.isArray(action.payload) ? action.payload : action.payload?.events || [];
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearEvenError } = eventSlice.actions;
export default eventSlice.reducer;