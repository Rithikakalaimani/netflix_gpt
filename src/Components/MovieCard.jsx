import { IMG_CDN_URL } from "../Utils/constant"

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='m-2 flex'>
      <img
        className='min-w-[200px] max-w-[200px] h-auto object-cover rounded-md shadow-lg'
        src={IMG_CDN_URL + posterPath}
        alt='movie_img'
      />
    </div>
  );
}

export default MovieCard;
