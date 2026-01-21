import { IMG_CDN_URL } from "../Utils/constant"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import WatchlistButton from "./WatchlistButton"
import { useEffect, useState } from "react"
import { API_OPTIONS } from "../Utils/constant"

const TVShowCard = ({posterPath, tvShowId, tvShow}) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [tvShowData, setTVShowData] = useState(tvShow);
  
  useEffect(() => {
    if (!tvShowData && tvShowId && user) {
      const fetchTVShow = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
            API_OPTIONS
          );
          const data = await response.json();
          if (data.id) {
            setTVShowData(data);
          }
        } catch (error) {
          console.error("Error fetching TV show:", error);
        }
      };
      fetchTVShow();
    } else if (tvShow && tvShow.id) {
      setTVShowData(tvShow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tvShowId, tvShow, user]);
  
  if(!posterPath) return null;
  
  const handleClick = (e) => {
    if (e.target.closest('button')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if(tvShowId) {
      navigate(`/tv/${tvShowId}`, { replace: false });
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
        alt='tvshow_img'
      />
      {user && tvShowData && tvShowData.id && (
        <WatchlistButton movie={tvShowData} />
      )}
    </div>
  );
}

export default TVShowCard;
