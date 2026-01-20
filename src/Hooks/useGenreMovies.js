import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { setGenreMovies, setGenreInfo, setLoading } from "../Utils/genreSlice";

const useGenreMovies = (genreId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genreId) return;

    const fetchGenreData = async () => {
      dispatch(setLoading(true));
      try {
        // First, get all genres to find the genre name
        const genresResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          API_OPTIONS
        );
        const genresData = await genresResponse.json();
        const genre = genresData.genres?.find((g) => g.id === parseInt(genreId));
        
        if (genre) {
          dispatch(setGenreInfo(genre));
        }

        // Fetch movies for this genre
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=1`,
          API_OPTIONS
        );
        const moviesData = await moviesResponse.json();
        dispatch(setGenreMovies(moviesData.results || []));
      } catch (error) {
        console.error("Error fetching genre movies:", error);
        dispatch(setGenreMovies([]));
        dispatch(setGenreInfo(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchGenreData();
  }, [genreId, dispatch]);
};

export default useGenreMovies;
