import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { getAccesTokenAPI, getEventsDataAPI } from "./eventsAPI";
import { EventItem } from "../../types/eventTypes";

export interface EventsState {
  eventList: EventItem[];
  isLoading: boolean;
  accessToken?: string;
  error?: string;
}

const initialState: EventsState = {
  eventList: [],
  isLoading: false,
  error: "",
};

export const getAccesToken = createAsyncThunk(
  "events/getAccesToken",
  async () => {
    const token = await getAccesTokenAPI();
    return token;
  }
);

export const getEventsData = createAsyncThunk(
  "events/getEventsData",
  async (month: number, thunkAPI: any) => {
    const token = thunkAPI.getState().events.accessToken;
    const eventList = await getEventsDataAPI(month, token);
    return eventList;
  }
);

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccesToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccesToken.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload;
      })
      .addCase(getAccesToken.rejected, (state) => {
        state.isLoading = false;
        state.error = "There is an error during getting token";
      })
      .addCase(getEventsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventsData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.eventList = payload;
      })
      .addCase(getEventsData.rejected, (state) => {
        state.isLoading = false;
        state.error = "There is an error during getting event data";
      });
  },
});

export default eventsSlice.reducer;
