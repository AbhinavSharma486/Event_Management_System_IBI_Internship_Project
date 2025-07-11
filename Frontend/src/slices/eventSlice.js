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

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventError(state) {
      state.error = null;
    }
  }
});

export const { clearEvenError } = eventSlice.actions;
export default eventSlice.reducer;