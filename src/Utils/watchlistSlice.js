import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [],
    loading: false,
  },
  reducers: {
    setWatchlist: (state, action) => {
      state.movies = action.payload;
    },
    addToWatchlist: (state, action) => {
      const movieExists = state.movies.some((m) => m.id === action.payload.id);
      if (!movieExists) {
        state.movies.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.movies = state.movies.filter((m) => m.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearWatchlist: (state) => {
      state.movies = [];
    },
  },
});

export default watchlistSlice.reducer;
export const {
  setWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  setLoading,
  clearWatchlist,
} = watchlistSlice.actions;
