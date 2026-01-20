import React, { useState, useRef, useEffect } from 'react'
import {auth, getWatchlist} from "../Utils/firebase";
import {signOut} from "firebase/auth";
import {useNavigate, useLocation} from "react-router-dom"; 
import {useSelector} from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { setWatchlist, clearWatchlist } from "../Utils/watchlistSlice";
import { LOGO_URL, PHOTO_URL } from '../Utils/constant';
import { toggleGPTSearchView } from '../Utils/GPTSlice';
import { SUPPORTED_LANGUAGES } from '../Utils/constant';
import { changeLanguage } from '../Utils/configSlice';
import SearchBar from './SearchBar';
import GenreMenu from './GenreMenu';

  const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setShowUserMenu(false);
        // navigate("/")
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  const handleGPTSearchClick = () => {
    // If we're on a page that doesn't support GPT (like /mylist, /search, etc.)
    if (location.pathname !== "/browse" && location.pathname !== "/tvshows") {
      // If GPT is already open (showing "Home"), navigate to browse and close GPT
      if (showGPTSearch) {
        dispatch(toggleGPTSearchView());
        navigate("/browse");
      } else {
        // If GPT is closed, toggle it first, then navigate to browse
        // This ensures Browse component mounts with GPT view already enabled
        dispatch(toggleGPTSearchView());
        navigate("/browse");
      }
    } else {
      // If already on a page that supports GPT, just toggle the view
      dispatch(toggleGPTSearchView());
    }
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/browse");
      // Also close GPT search if it's open
      if (showGPTSearch) {
        dispatch(toggleGPTSearchView());
      }
    }
  };

  const handleMyListClick = () => {
    navigate("/mylist");
    setShowUserMenu(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  // used in the header as the onAuthStateChange as it is central to the app and tracks the user state
  // ...whenever signedIn/signedOut onAuthStateChange is called and routing can be done from here
  // so whenever the header component is rendered the useEffect is called and the user is tracked
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        // Use default photo if photoURL is missing or empty
        const userPhotoURL = photoURL || PHOTO_URL;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: userPhotoURL,
          })
        );
        // Load watchlist when user logs in (async, don't block navigation)
        getWatchlist(uid)
          .then((watchlistMovies) => {
            dispatch(setWatchlist(watchlistMovies));
          })
          .catch((error) => {
            console.error("Error loading watchlist:", error);
            // Don't block authentication if watchlist fails
          });
        // Only navigate to /browse if we're on the login page
        // Don't navigate if we're already on /browse or /movie/:movieId
        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        dispatch(clearWatchlist());
        // Only navigate to login if we're not already there
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    });
    // cleanup function .i.e. when the component is unmounted the unsubscribe function is called
    // (unsubscribe from the auth state change)
    return () => unsubscribe();
  }, [location.pathname, navigate, dispatch]); // Include location.pathname in dependencies


  return (
     <div
      className={`z-[100] md:h-20 w-full flex absolute  overflow-visible flex-row justify-between
        ${user ? "bg-black" : "bg-gradient-to-b from-black to-transparent"}`}
    >
       {/* <div
      className={`z-50 md:h-20 w-full flex flex-col absolute justify-center overflow-hidden md:flex-row md:justify-between
       ${user ? "bg-black" : "bg-gradient-to-b from-black to-transparent"}`}
     > */}
      <div className='m-2 pt-2 md:pt-0 flex md:items-center'>
        <img 
          className='w-24 md:p-2 md:w-2/12 md:mx-0 cursor-pointer hover:opacity-80 transition-opacity'
          src={LOGO_URL}
          alt='logo'
          onClick={handleLogoClick}
        />
        {user && (
          <>
            <button
              className='md:m-2 p-2 font-light text-white text-xs  md:text-sm whitespace-nowrap'
              onClick={handleGPTSearchClick}
            >
              {showGPTSearch ? "Home" : "GPT"}
            </button>
            <button
              className='md:m-2 p-2 font-light text-white text-xs  md:text-sm whitespace-nowrap'
              onClick={() => navigate("/tvshows")}
            >
              TV Shows
            </button>
            <GenreMenu />
            <div className="hidden md:block">
              <SearchBar />
            </div>
          </>
        )}
      </div>
      {user && (
        <div className='m-1 px-2 flex items-center relative' ref={menuRef}>
          {showGPTSearch && (
            <select
              className='p-1 text-xs md:text-sm rounded-sm outline-none'
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <div className="relative">
            <img
              className="mx-2 md:mx-10 w-10 h-10 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              src={user?.photoURL || PHOTO_URL}
              alt='userIcon'
              onClick={() => setShowUserMenu(!showUserMenu)}
              onError={(e) => {
                // Fallback to default photo if image fails to load
                if (e.target.src !== PHOTO_URL) {
                  e.target.src = PHOTO_URL;
                } else {
                  // If default also fails, use a simple placeholder
                  e.target.style.display = 'none';
                }
              }}
              style={{ minWidth: '40px', minHeight: '40px' }}
            />
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg z-[200]">
                <div className="py-1">
                  <button
                    onClick={handleMyListClick}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    My List
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;
