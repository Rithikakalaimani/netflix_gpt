import { useNavigate } from "react-router-dom";

const GenreTag = ({ genre, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (genre && genre.id) {
      navigate(`/genre/${genre.id}`);
    }
  };

  return (
    <span
      onClick={handleClick}
      className={`px-3 py-1 bg-gray-700 hover:bg-red-600 rounded-md text-sm text-white cursor-pointer transition-colors ${className}`}
      title={`Browse ${genre.name} movies`}
    >
      {genre.name}
    </span>
  );
};

export default GenreTag;
