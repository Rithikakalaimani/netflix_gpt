import React, { useRef } from "react";
import lang from "../Utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../Utils/openAI";
import { API_OPTIONS } from "../Utils/constant";
import { addGPTMovieResult } from "../Utils/GPTSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleMovieTMBD = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const res = await data.json();
    return res.results;
  };

  const handleGPTSearchClick = async () => {
    //make an API call and get movie results
    console.log(searchText.current.value);
    const GPTQuery =
      "act as a movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      "only give me names of 20 movies,comma-separated like the example result give ahead. Example Result : Coolie , Master, 3idiots, Don, Baahubali, parasite, Interstellar, Avengers, Inception, Tenet . don't give and words";

    const GPTResults = await client.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [{ role: "user", content: GPTQuery }],
    });
    // console.log(GPTResults.choices);
    // // console.log(GPTResults.choices?.[0]?message?.content);
    // console.log("Content:", GPTResults.choices?.[0]?.message?.content);
    // const GPTMovies = GPTResults.choices?.[0]?.message?.content;
    // const promiseArray = GPTMovies.map((movie) => handleMovieTMBD(movie)); // doesnot give res but promises as it calls a async func [p1,p2,p3,...p10]
    // const tmbdResults = await Promise.all(promiseArray);
    // console.log(tmbdResults);
    // dispatch(
    //   addGPTMovieResult({ movieNames: GPTMovies, movieResults: tmbdResults })
    // );
    console.log("GPT Results:", GPTResults.choices);
    const content = GPTResults.choices?.[0]?.message?.content;
    console.log("Content:", content);

    if (typeof content === "string") {
    
      const GPTMovies = content
        .split(",") // Split on commas
        .map((movie) => movie.trim()) // Trim whitespace from each movie
        .filter((movie) => movie.length > 0); // Filter out any empty strings
      console.log("Movies Array:", GPTMovies);

      // if (GPTMovies.length === 0) {
      //   throw new Error("No valid movie names found in the response.");
      // }
      const promiseArray = GPTMovies.map((movie) => handleMovieTMBD(movie));
      const tmbdResults = await Promise.all(promiseArray);
      console.log("TMDB Results:", tmbdResults);
      dispatch(addGPTMovieResult({ movieNames: GPTMovies, movieResults: tmbdResults }));
    }
  };

  return (
    <div className='bg-black w-screen'>
      <form className='pt-5 p-10' onSubmit={(e) => e.preventDefault()}>
        <div className='mt-10 pt-10 flex justify-center'>
          <input
            ref={searchText}
            type='text'
            className='m-2 p-2 w-5/6 rounded-md outline-none '
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className='m-2 p-2 px-5  text-white bg-red-600 rounded-md hover:bg-red-700'
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
