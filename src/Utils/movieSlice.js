import { createSlice } from "@reduxjs/toolkit";

 
const movies = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies :null,
    trailerVideo: null,
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
  },
});
export default movies.reducer;
export const {addnowPlayingMovies,addPopularMovies,
  addTopRatedMovies,addUpcomingMovies,addTrailerVideo} = movies.actions;
