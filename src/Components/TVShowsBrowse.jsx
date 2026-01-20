import React from 'react'
import Header from "./Header";
import useAiringTodayTV from '../Hooks/useAiringTodayTV';
import TVShowMainContainer from './TVShowMainContainer';
import TVShowSecondaryContainer from './TVShowSecondaryContainer';
import usePopularTV from '../Hooks/usePopularTV';
import useTopRatedTV from '../Hooks/useTopRatedTV';
import useOnTheAirTV from '../Hooks/useOnTheAirTV';
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';

const TVShowsBrowse = () => {
  const showGPTSearch = useSelector((store)=>store.gpt.showGPTSearch);
  useAiringTodayTV();
  usePopularTV();
  useTopRatedTV();
  useOnTheAirTV();
  return (
    <div>
      <Header />
      {showGPTSearch ? (
        <GPTSearch />
      ) : (
        <>
          <TVShowMainContainer />
          <TVShowSecondaryContainer />
        </>
      )}
    </div>
  );
}

export default TVShowsBrowse;
