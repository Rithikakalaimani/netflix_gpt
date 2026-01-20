import React, { useRef } from "react";
import lang from "../Utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../Utils/openAI";
import { API_OPTIONS } from "../Utils/constant";
import { addGPTMovieResult, addGPTTVShowResult, clearGPTResults } from "../Utils/GPTSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleMovieTMBD = async (movie) => {
    try {
      const encodedMovie = encodeURIComponent(movie);
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodedMovie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const res = await data.json();
      // Return only the first (best match) result, or empty array if no results
      if (res.results && res.results.length > 0) {
        return [res.results[0]]; // Return as array with only the best match
      }
      return []; // Return empty array if no results found
    } catch (error) {
      console.error(`Error fetching movie ${movie}:`, error);
      return [];
    }
  };

  const handleTVShowTMBD = async (tvShow) => {
    try {
      const encodedTVShow = encodeURIComponent(tvShow);
      const data = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodedTVShow}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const res = await data.json();
      // Return only the first (best match) result, or empty array if no results
      if (res.results && res.results.length > 0) {
        return [res.results[0]]; // Return as array with only the best match
      }
      return []; // Return empty array if no results found
    } catch (error) {
      console.error(`Error fetching TV show ${tvShow}:`, error);
      return [];
    }
  };

  const handleGPTSearchClick = async () => {
    if (!searchText.current?.value?.trim()) {
      return;
    }

    // Clear previous results
    dispatch(clearGPTResults());

    const userQuery = searchText.current.value.trim();
    console.log("User Query:", userQuery);

    // Improved prompt for better movie and TV show recommendations
    const GPTQuery = `You are a movie and TV show recommendation expert. Based on the user's query: "${userQuery}", suggest exactly 10 highly relevant and popular movies AND 10 highly relevant and popular TV shows that match the query criteria.

Requirements:
- Only suggest well-known, popular movies and TV shows that match the query
- Use exact titles as they appear in databases (use original titles, not translated)
- Return in this EXACT format: MOVIES: [comma-separated movie names], TVSHOWS: [comma-separated TV show names]
- Do not include any explanations, numbers, or additional text
- Ensure all suggestions are relevant to the query

Example format: MOVIES: Inception, Interstellar, The Matrix, Tenet, Arrival, TVSHOWS: Breaking Bad, Game of Thrones, Stranger Things, The Crown, The Office

Now suggest for: "${userQuery}"`;

    try {
      const GPTResults = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: GPTQuery }],
        temperature: 0.7,
        max_tokens: 300,
      });

      console.log("GPT Results:", GPTResults.choices);
      const content = GPTResults.choices?.[0]?.message?.content;
      console.log("Content:", content);

      if (typeof content === "string") {
        // Parse the response to separate movies and TV shows
        const moviesMatch = content.match(/MOVIES:\s*(.+?)(?:\s*TVSHOWS:|$)/i);
        const tvShowsMatch = content.match(/TVSHOWS:\s*(.+?)$/i);

        let GPTMovies = [];
        let GPTTVShows = [];

        if (moviesMatch) {
          GPTMovies = moviesMatch[1]
            .split(",")
            .map((movie) => movie.trim())
            .filter((movie) => movie.length > 0)
            .slice(0, 10);
        }

        if (tvShowsMatch) {
          GPTTVShows = tvShowsMatch[1]
            .split(",")
            .map((tvShow) => tvShow.trim())
            .filter((tvShow) => tvShow.length > 0)
            .slice(0, 10);
        }

        // Fallback: if format not found, try to parse as comma-separated list
        if (GPTMovies.length === 0 && GPTTVShows.length === 0) {
          const allItems = content
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
          // Split roughly in half - first half movies, second half TV shows
          const midPoint = Math.ceil(allItems.length / 2);
          GPTMovies = allItems.slice(0, midPoint);
          GPTTVShows = allItems.slice(midPoint);
        }

        console.log("Movies Array:", GPTMovies);
        console.log("TV Shows Array:", GPTTVShows);

        // Fetch movie details from TMDB
        let allValidMovies = [];
        if (GPTMovies.length > 0) {
          const moviePromiseArray = GPTMovies.map((movie) => handleMovieTMBD(movie));
          const movieTmbdResults = await Promise.all(moviePromiseArray);

          GPTMovies.forEach((movieName, index) => {
            const results = movieTmbdResults[index];
            if (results && results.length > 0 && results[0]) {
              allValidMovies.push(results[0]);
            }
          });
        }

        // Fetch TV show details from TMDB
        let allValidTVShows = [];
        if (GPTTVShows.length > 0) {
          const tvShowPromiseArray = GPTTVShows.map((tvShow) => handleTVShowTMBD(tvShow));
          const tvShowTmbdResults = await Promise.all(tvShowPromiseArray);

          GPTTVShows.forEach((tvShowName, index) => {
            const results = tvShowTmbdResults[index];
            if (results && results.length > 0 && results[0]) {
              allValidTVShows.push(results[0]);
            }
          });
        }

        console.log("All Valid Movies:", allValidMovies);
        console.log("All Valid TV Shows:", allValidTVShows);

        // Dispatch results
        if (allValidMovies.length > 0) {
          dispatch(
            addGPTMovieResult({
              movieNames: [`Movies for: ${userQuery}`],
              movieResults: [allValidMovies],
            })
          );
        }

        if (allValidTVShows.length > 0) {
          dispatch(
            addGPTTVShowResult({
              tvShowNames: [`TV Shows for: ${userQuery}`],
              tvShowResults: [allValidTVShows],
            })
          );
        }

        if (allValidMovies.length === 0 && allValidTVShows.length === 0) {
          console.error("No valid results found.");
        }
      }
    } catch (error) {
      console.error("Error in GPT search:", error);
    }
  };
  // pt-5 p-10
  // mt-10 pt-10
  return (
    <div className='w-screen'>
      <form className='md:pt-5 p-10' onSubmit={(e) => e.preventDefault()}>
        <div className='mt-12 pt-12 flex justify-center'>
          <input
            ref={searchText}
            type='text'
            className='mt-5 mr-1 md:m-2 p-2 text-xs md:text-sm w-5/6 rounded-md outline-none '
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className='mt-5 ml-1 md:m-2 p-2  text-xs md:text-sm md:px-5  text-white bg-red-600 rounded-md hover:bg-red-700'
            onClick={handleGPTSearchClick}
          >
            {lang[langKey].search}
          </button>
        </div>
      </form>
    </div>
  );
};
export default GPTSearchBar;
