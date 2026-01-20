import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import useGenreMovies from "../Hooks/useGenreMovies";
import { clearGenreData } from "../Utils/genreSlice";

const GenrePage = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genreMovies, genreInfo, isLoading } = useSelector(
    (store) => store.genre
  );

  useGenreMovies(genreId);

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      dispatch(clearGenreData());
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading genre movies...</div>
        </div>
      </div>
    );
  }

  if (!genreInfo) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-20 flex flex-col items-center justify-center min-h-screen">
          <div className="text-white text-xl mb-4">Genre not found</div>
          <button
            onClick={() => navigate("/browse")}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Go Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-20 px-4 md:px-10 py-8">
        {/* Genre Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {genreInfo.name} Movies
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {genreMovies.length > 0
              ? `Discover ${genreMovies.length}+ ${genreInfo.name.toLowerCase()} movies`
              : "No movies found in this genre"}
          </p>
        </div>

        {/* Movies List */}
        {genreMovies.length > 0 ? (
          <div className="bg-stone-900 rounded-md p-4 md:p-6">
            <MovieList title="" movies={genreMovies} />
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              No movies found in this genre
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Go Back to Browse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
