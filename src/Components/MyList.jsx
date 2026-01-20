import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MovieList from "./MovieList";
import { getWatchlist } from "../Utils/firebase";
import { setWatchlist, setLoading } from "../Utils/watchlistSlice";

const MyList = () => {
  const user = useSelector((store) => store.user);
  const watchlist = useSelector((store) => store.watchlist?.movies || []);
  const watchlistLoading = useSelector((store) => store.watchlist?.loading || false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // If watchlist is already in Redux and we've loaded once, don't reload
    if (hasLoaded) {
      return;
    }

    const loadWatchlist = async () => {
      try {
        dispatch(setLoading(true));
        
        // Add timeout to prevent infinite loading (3 seconds)
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );
        
        const moviesPromise = getWatchlist(user.uid);
        const movies = await Promise.race([moviesPromise, timeoutPromise]);
        
        dispatch(setWatchlist(movies || []));
        setHasLoaded(true);
      } catch (error) {
        console.error("Error loading watchlist:", error);
        // Set empty array on timeout or error
        dispatch(setWatchlist([]));
        setHasLoaded(true);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadWatchlist();
  }, [user, dispatch, navigate, hasLoaded]);

  if (!user) {
    return null;
  }

  if (watchlistLoading && !hasLoaded) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading your list...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-20">
        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">My List</h1>
            <p className="text-gray-400 text-lg mb-8">
              Your watchlist is empty. Start adding movies!
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="bg-stone-900 m-3 md:m-20 rounded-md pb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-white p-5 md:p-10">
              My List ({watchlist.length})
            </h1>
            <MovieList title="" movies={watchlist} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
