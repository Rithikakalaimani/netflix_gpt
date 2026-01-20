import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import {
  setMovieResults,
  setTVShowResults,
  setActorResults,
  setLoading,
  setGenreResults,
} from "../Utils/searchSlice";

const useSearch = (query, debounceDelay = 500) => {
  const dispatch = useDispatch();
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [query, debounceDelay]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      dispatch(setMovieResults([]));
      dispatch(setActorResults([]));
      dispatch(setGenreResults([]));
      dispatch(setLoading(false));
      return;
    }

    const searchMovies = async () => {
      dispatch(setLoading(true));
      try {
        // Search movies
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            debouncedQuery
          )}&include_adult=false&language=en-US&page=1`,
          API_OPTIONS
        );
        const movieData = await movieResponse.json();
        dispatch(setMovieResults(movieData.results || []));

        // Search TV shows
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
            debouncedQuery
          )}&include_adult=false&language=en-US&page=1`,
          API_OPTIONS
        );
        const tvData = await tvResponse.json();
        dispatch(setTVShowResults(tvData.results || []));

        // Search actors/people
        const actorResponse = await fetch(
          `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
            debouncedQuery
          )}&include_adult=false&language=en-US&page=1`,
          API_OPTIONS
        );
        const actorData = await actorResponse.json();
        dispatch(setActorResults(actorData.results || []));

        // Search by genre (get genres and filter)
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          API_OPTIONS
        );
        const genreData = await genreResponse.json();
        
        // Find matching genres
        const matchingGenres = genreData.genres?.filter((genre) =>
          genre.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        ) || [];

        // If genre found, get movies for that genre
        if (matchingGenres.length > 0) {
          const genreMoviesResponse = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${matchingGenres[0].id}&language=en-US&page=1`,
            API_OPTIONS
          );
          const genreMoviesData = await genreMoviesResponse.json();
          dispatch(setGenreResults({
            genres: matchingGenres,
            movies: genreMoviesData.results || [],
          }));
        } else {
          dispatch(setGenreResults({ genres: [], movies: [] }));
        }
      } catch (error) {
        console.error("Error searching:", error);
        dispatch(setMovieResults([]));
        dispatch(setTVShowResults([]));
        dispatch(setActorResults([]));
        dispatch(setGenreResults({ genres: [], movies: [] }));
      } finally {
        dispatch(setLoading(false));
      }
    };

    searchMovies();
  }, [debouncedQuery, dispatch]);
};

export default useSearch;
