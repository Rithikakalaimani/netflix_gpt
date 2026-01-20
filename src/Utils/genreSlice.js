import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genreMovies: [],
    genreInfo: null,
    isLoading: false,
  },
  reducers: {
    setGenreMovies: (state, action) => {
      state.genreMovies = action.payload;
    },
    setGenreInfo: (state, action) => {
      state.genreInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearGenreData: (state) => {
      state.genreMovies = [];
      state.genreInfo = null;
    },
  },
});

export default genreSlice.reducer;
export const {
  setGenreMovies,
  setGenreInfo,
  setLoading,
  clearGenreData,
} = genreSlice.actions;
