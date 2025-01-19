import { IMG_CDN_URL } from "../Utils/constant"

const MovieCard = ({posterPath}) => {
  return (
    <div>
      <img
        src={IMG_CDN_URL + posterPath}
        alt='movie_img'
      />
    </div>
  );
}

export default MovieCard;
