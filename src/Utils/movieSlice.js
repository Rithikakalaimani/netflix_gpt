import { createSlice } from "@reduxjs/toolkit";

 
const movies = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies :null,
    trailerVideo: null,
    selectedMovie: null,
    similarMovies: null,
  },
  reducers: {
    addnowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    addSimilarMovies: (state, action) => {
      state.similarMovies = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
      state.similarMovies = null;
      state.trailerVideo = null;
    },
  },
});
export default movies.reducer;
export const {addnowPlayingMovies,addPopularMovies,
  addTopRatedMovies,addUpcomingMovies,addTrailerVideo,
  addSelectedMovie,addSimilarMovies,clearSelectedMovie} = movies.actions;
