import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { setActorMovies } from "../Utils/actorSlice";

const useActorMovies = (actorId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!actorId) return;

    const fetchActorMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        // Sort by popularity and get top movies
        const sortedMovies = (data.cast || [])
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          .slice(0, 20); // Limit to top 20 movies
        dispatch(setActorMovies(sortedMovies));
      } catch (error) {
        console.error("Error fetching actor movies:", error);
        dispatch(setActorMovies([]));
      }
    };

    fetchActorMovies();
  }, [actorId, dispatch]);
};

export default useActorMovies;
