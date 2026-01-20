import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGenres from "../Hooks/useGenres";

const GenreMenu = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const { genres, loading } = useGenres();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`);
    setShowMenu(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="md:m-2 p-2 font-light text-white text-xs md:text-sm whitespace-nowrap hover:opacity-80 transition-opacity"
      >
        Genres
      </button>
      {showMenu && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-[200] max-h-96 overflow-y-auto">
          <div className="py-1">
            {loading ? (
              <div className="px-4 py-2 text-sm text-gray-400">Loading...</div>
            ) : genres.length > 0 ? (
              genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                >
                  {genre.name}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">
                No genres available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreMenu;
