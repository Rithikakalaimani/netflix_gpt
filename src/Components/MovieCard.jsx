import { IMG_CDN_URL } from "../Utils/constant"

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='m-2 flex hover:scale-105'>
      <img
        className='min-w-[100px] max-w-[100px] md:min-w-[200px] md:max-w-[200px] h-auto object-cover rounded-md shadow-lg'
        src={IMG_CDN_URL + posterPath}
        alt='movie_img'
      />
    </div>
  );
}

export default MovieCard;
