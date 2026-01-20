import { createSlice } from "@reduxjs/toolkit";

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState: {
    airingTodayTV: null,
    popularTV: null,
    topRatedTV: null,
    onTheAirTV: null,
    trailerVideo: null,
    selectedTVShow: null,
    similarTVShows: null,
  },
  reducers: {
    addAiringTodayTV: (state, action) => {
      state.airingTodayTV = action.payload;
    },
    addPopularTV: (state, action) => {
      state.popularTV = action.payload;
    },
    addTopRatedTV: (state, action) => {
      state.topRatedTV = action.payload;
    },
    addOnTheAirTV: (state, action) => {
      state.onTheAirTV = action.payload;
    },
    addTVTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addSelectedTVShow: (state, action) => {
      state.selectedTVShow = action.payload;
    },
    addSimilarTVShows: (state, action) => {
      state.similarTVShows = action.payload;
    },
    clearSelectedTVShow: (state) => {
      state.selectedTVShow = null;
      state.similarTVShows = null;
      state.trailerVideo = null;
    },
  },
});

export default tvShowsSlice.reducer;
export const {
  addAiringTodayTV,
  addPopularTV,
  addTopRatedTV,
  addOnTheAirTV,
  addTVTrailerVideo,
  addSelectedTVShow,
  addSimilarTVShows,
  clearSelectedTVShow,
} = tvShowsSlice.actions;
