import { createSlice } from "@reduxjs/toolkit";

const actorSlice = createSlice({
  name: "actor",
  initialState: {
    actorDetails: null,
    actorMovies: [],
    isLoading: false,
  },
  reducers: {
    setActorDetails: (state, action) => {
      state.actorDetails = action.payload;
    },
    setActorMovies: (state, action) => {
      state.actorMovies = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearActorData: (state) => {
      state.actorDetails = null;
      state.actorMovies = [];
    },
  },
});

export default actorSlice.reducer;
export const {
  setActorDetails,
  setActorMovies,
  setLoading,
  clearActorData,
} = actorSlice.actions;
