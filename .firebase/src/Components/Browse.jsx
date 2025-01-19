import React from 'react'
import Header from "./Header";
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
 
const Browse = () => {
  useNowPlayingMovies();
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

