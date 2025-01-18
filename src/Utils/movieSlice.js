import { createSlice } from "@reduxjs/toolkit";

 
const movies = createSlice({
  name : "movies",
  initialState : {
    nowPlayingMovies :null,
    trailerVideo : null
  },
  reducers:{
    addnowPlayingMovies : (state,action) =>{
       state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo : (state,action) =>{
      state.trailerVideo = action.payload;
    }
  }
});
export default movies.reducer;
export const {addnowPlayingMovies,addTrailerVideo} = movies.actions;
