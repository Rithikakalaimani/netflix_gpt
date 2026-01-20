import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import GPTReducer from "./GPTSlice";
import configReducer from "./configSlice";
import watchlistReducer from "./watchlistSlice";
import toastReducer from "./toastSlice";
import searchReducer from "./searchSlice";
import actorReducer from "./actorSlice";
import genreReducer from "./genreSlice";
import tvShowsReducer from "./tvShowsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: GPTReducer,
    config: configReducer,
    watchlist: watchlistReducer,
    toast: toastReducer,
    search: searchReducer,
    actor: actorReducer,
    genre: genreReducer,
    tvShows: tvShowsReducer,
  },
});

export default appStore;