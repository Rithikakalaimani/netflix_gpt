import React from 'react'
import Header from "./Header";
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../Hooks/usePopularMovies';
import useTopRatedMovies from '../Hooks/useTopRatedMovies';
import useUpcomingMovies from '../Hooks/useUpcomingMovies';
 
const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
      {/* 
        Main Container
         - movie bg
         - movie title 
        Seconadary Container
         - movie list * n
           -card * n
       */}
    </div>
  )
}

export default Browse

