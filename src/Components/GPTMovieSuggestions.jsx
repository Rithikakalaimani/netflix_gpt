import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if(!movieNames) return null;
  
  return (
  <div className='bg-stone-900 m-20 rounded-md'>
   <div>
    {movieNames.map(
      (movieName,index)=><MovieList key={movieName} title={movieName} movies={movieResults[index]}/>)}
   </div>
  </div>
  )}
export default GPTMovieSuggestions;
