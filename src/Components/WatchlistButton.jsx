import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWatchlist as addToFirebase, removeFromWatchlist as removeFromFirebase, isInWatchlist } from "../Utils/firebase";
import { addToWatchlist, removeFromWatchlist } from "../Utils/watchlistSlice";
import { showToast } from "../Utils/toastSlice";

const WatchlistButton = ({ movie, variant = "absolute" }) => {
  const user = useSelector((store) => store.user);
  const watchlist = useSelector((store) => store.watchlist?.movies || []);
  const dispatch = useDispatch();
  const [isInList, setIsInList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (!movie || !movie.id || !user) {
        setIsInList(false);
        return;
      }

      // First check Redux immediately - check the actual array, not just length
      const existsInRedux = watchlist.some((m) => m && m.id === movie.id);
      if (existsInRedux) {
        setIsInList(true);
        return;
      }

      // If not in Redux, check Firebase (with timeout)
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 2000)
        );
        const existsPromise = isInWatchlist(user.uid, movie.id);
        const exists = await Promise.race([existsPromise, timeoutPromise]);
        setIsInList(exists);
      } catch (error) {
        console.error("Error checking watchlist:", error);
        setIsInList(false);
      }
    };

    checkStatus();
  }, [movie?.id, watchlist, user?.uid]);

  const handleToggleWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate inputs
    if (!user || !user.uid) {
      dispatch(showToast({ 
        message: "Please sign in to add movies to your list", 
        type: "error" 
      }));
      return;
    }

    if (!movie || !movie.id) {
      dispatch(showToast({ 
        message: "Invalid movie data", 
        type: "error" 
      }));
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    try {
      if (isInList) {
        // Remove from watchlist
        const success = await removeFromFirebase(user.uid, movie.id);
        if (success) {
          dispatch(removeFromWatchlist(movie.id));
          setIsInList(false);
          dispatch(showToast({ 
            message: "Removed from My List", 
            type: "success" 
          }));
        } else {
          dispatch(showToast({ 
            message: "Failed to remove. Please try again.", 
            type: "error" 
          }));
        }
      } else {
        // Add to watchlist - ensure movie object has all required fields
        const movieToSave = {
          id: movie.id,
          title: movie.title || movie.original_title || "Untitled",
          poster_path: movie.poster_path || "",
          backdrop_path: movie.backdrop_path || "",
          overview: movie.overview || "",
          release_date: movie.release_date || "",
          vote_average: movie.vote_average || 0,
        };
        
        try {
          const success = await addToFirebase(user.uid, movieToSave);
          if (success) {
            // Check if already in Redux before adding
            const alreadyInRedux = watchlist.some((m) => m && m.id === movie.id);
            if (!alreadyInRedux) {
              dispatch(addToWatchlist(movieToSave));
            }
            // Update local state immediately
            setIsInList(true);
            dispatch(showToast({ 
              message: alreadyInRedux ? "Movie is already in your list" : "Added to My List", 
              type: "success" 
            }));
          } else {
            // Check if it's already in Redux (might have been added in a previous attempt)
            const alreadyInRedux = watchlist.some((m) => m && m.id === movie.id);
            if (alreadyInRedux) {
              setIsInList(true);
              dispatch(showToast({ 
                message: "Movie is already in your list", 
                type: "success" 
              }));
            } else {
              dispatch(showToast({ 
                message: "Failed to add. Check console for details (F12).", 
                type: "error" 
              }));
            }
          }
        } catch (firebaseError) {
          // Handle specific Firebase errors
          let errorMessage = "Failed to add. ";
          if (firebaseError.code === "permission-denied") {
            errorMessage += "Permission denied. Check Firebase security rules.";
          } else if (firebaseError.code === "unavailable") {
            errorMessage += "Service unavailable. Please try again.";
          } else {
            errorMessage += firebaseError.message || "Please check your connection.";
          }
          
          // Check if it's already in Redux anyway
          const alreadyInRedux = watchlist.some((m) => m && m.id === movie.id);
          if (alreadyInRedux) {
            setIsInList(true);
            dispatch(showToast({ 
              message: "Movie is already in your list", 
              type: "success" 
            }));
          } else {
            dispatch(showToast({ 
              message: errorMessage, 
              type: "error" 
            }));
          }
        }
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      dispatch(showToast({ 
        message: `Error: ${error.message || "Please try again"}`, 
        type: "error" 
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!user || !movie || !movie.id) {
    return null;
  }

  return (
    <button
      onClick={handleToggleWatchlist}
      disabled={loading}
      type="button"
      className={`${
        variant === "absolute" 
          ? "absolute top-2 right-2" 
          : "relative"
      } bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 md:p-3 transition-all z-20 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      aria-label={isInList ? "Remove from watchlist" : "Add to watchlist"}
      title={isInList ? "Remove from My List" : "Add to My List"}
    >
      {isInList ? (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      )}
    </button>
  );
};

export default WatchlistButton;
