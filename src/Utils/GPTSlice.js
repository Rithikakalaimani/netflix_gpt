
import { createSlice} from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    GPTMovies: true,
    movieNames : [],
    movieResults : []
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
  },
});
export default GPTSlice.reducer;
export const {toggleGPTSearchView,addGPTMovieResult} = GPTSlice.actions;