
import { createSlice} from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    GPTMovies: true,
    movieNames : [],
    movieResults : [],
    tvShowNames : [],
    tvShowResults : []
  },
  reducers: {
    toggleGPTSearchView: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.GPTMovies = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    addGPTTVShowResult: (state, action) => {
      const { tvShowNames, tvShowResults } = action.payload;
      state.tvShowNames = tvShowNames;
      state.tvShowResults = tvShowResults;
    },
    clearGPTResults: (state) => {
      state.movieNames = [];
      state.movieResults = [];
      state.tvShowNames = [];
      state.tvShowResults = [];
    },
  },
});
export default GPTSlice.reducer;
export const {toggleGPTSearchView,addGPTMovieResult,addGPTTVShowResult,clearGPTResults} = GPTSlice.actions;