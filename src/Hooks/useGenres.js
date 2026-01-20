import { useEffect, useState } from "react";
import { API_OPTIONS } from "../Utils/constant";

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          API_OPTIONS
        );
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading };
};

export default useGenres;
