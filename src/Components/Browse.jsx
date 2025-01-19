import React from 'react'
import Header from "./Header";
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../Hooks/usePopularMovies';
 
const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
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

