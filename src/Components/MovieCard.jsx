import { IMG_CDN_URL } from "../Utils/constant"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import WatchlistButton from "./WatchlistButton"
import { useEffect, useState } from "react"
import { API_OPTIONS } from "../Utils/constant"

const MovieCard = ({posterPath, movieId, movie}) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [movieData, setMovieData] = useState(movie);
  
  useEffect(() => {
    // If movie object is not provided, fetch it
    if (!movieData && movieId && user) {
      const fetchMovie = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            API_OPTIONS
          );
          const data = await response.json();
          if (data.id) {
            setMovieData(data);
          }
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      };
      fetchMovie();
    } else if (movie && movie.id) {
      // Use provided movie object if it has id
      setMovieData(movie);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, movie, user]);
  
  if(!posterPath) return null;
  
  const handleClick = (e) => {
    // Don't navigate if clicking on watchlist button
    if (e.target.closest('button')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if(movieId) {
      navigate(`/movie/${movieId}`, { replace: false });
    }
  };
  
  return (
    <div 
      className='m-2 flex hover:scale-105 cursor-pointer transition-transform duration-200 relative'
      onClick={handleClick}
    >
      <img
        className='min-w-[100px] max-w-[100px] md:min-w-[200px] md:max-w-[200px] h-auto object-cover rounded-md shadow-lg pointer-events-none'
        src={IMG_CDN_URL + posterPath}
        alt='movie_img'
      />
      {user && movieData && movieData.id && (
        <WatchlistButton movie={movieData} />
      )}
    </div>
  );
}

export default MovieCard;
