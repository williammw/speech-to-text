import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  progress: 0,
  transcription: null,
  error: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setTranscription: (state, action) => {
      state.transcription = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setProgress,
  setTranscription,
  setError,
} = apiSlice.actions;

export const selectApiState = (state) => state.api;

export default apiSlice.reducer;
