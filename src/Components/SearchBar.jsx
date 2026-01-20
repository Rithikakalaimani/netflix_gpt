import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSearchQuery,
  setShowSearchResults,
  clearSearchResults,
} from "../Utils/searchSlice";
import useSearch from "../Hooks/useSearch";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const searchResultsRef = useRef(null);
  const { showSearchResults } = useSelector((store) => store.search);

  // Use the search hook
  useSearch(searchInput);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setIsFocused(false);
        dispatch(setShowSearchResults(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearchQuery(value));
    
    if (value.trim().length > 0) {
      dispatch(setShowSearchResults(true));
    } else {
      dispatch(setShowSearchResults(false));
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchInput.trim().length > 0) {
      dispatch(setShowSearchResults(true));
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim().length > 0) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
      setIsFocused(false);
      dispatch(setShowSearchResults(false));
    }
  };

  const handleClear = () => {
    setSearchInput("");
    dispatch(clearSearchResults());
    setIsFocused(false);
  };

  return (
    <div className="relative flex-1 max-w-md mx-2 md:mx-4" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Search movies, actors..."
          value={searchInput}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="w-full px-4 py-2 bg-black bg-opacity-70 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white transition-all text-sm md:text-base"
        />
        {searchInput && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
      {showSearchResults && isFocused && (
        <div ref={searchResultsRef}>
          <SearchResults />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
