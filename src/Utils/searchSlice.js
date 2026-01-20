import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    movieResults: [],
    tvShowResults: [],
    actorResults: [],
    genreResults: [],
    isLoading: false,
    showSearchResults: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    setMovieResults: (state, action) => {
      state.movieResults = action.payload;
    },
    setTVShowResults: (state, action) => {
      state.tvShowResults = action.payload;
    },
    setActorResults: (state, action) => {
      state.actorResults = action.payload;
    },
    setGenreResults: (state, action) => {
      state.genreResults = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setShowSearchResults: (state, action) => {
      state.showSearchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.movieResults = [];
      state.tvShowResults = [];
      state.actorResults = [];
      state.genreResults = [];
      state.query = "";
      state.showSearchResults = false;
    },
  },
});

export default searchSlice.reducer;
export const {
  setSearchQuery,
  setMovieResults,
  setTVShowResults,
  setActorResults,
  setGenreResults,
  setLoading,
  setShowSearchResults,
  clearSearchResults,
} = searchSlice.actions;
