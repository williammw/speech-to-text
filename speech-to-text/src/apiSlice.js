import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  progress: 0,
  transcription: null,
  error: null,
  downloadLink: null, // Add downloadLink to initial state
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setTranscription: (state, action) => {
      console.log(action.payload);
      state.transcription = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDownloadLink: (state, action) => {
      // console.log(action.payload)
      // const downloadLink = action.payload.match(/href="([^"]*)/)[1];
      state.downloadLink = 'http://127.0.0.1:5000/download/transcription';
    },
  },
});

export const {
  setIsLoading,
  setProgress,
  setTranscription,
  setError,
  setDownloadLink, // Export setDownloadLink
} = apiSlice.actions;

export const selectApiState = (state) => state.api;

export default apiSlice.reducer;
