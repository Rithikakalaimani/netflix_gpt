import { BG_IMG_URL } from "../Utils/constant";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
  return (
    <div>
      <div className='absolute -z-20'>
        <img
          className='w-screen object-cover'
          src={BG_IMG_URL}
          alt='bg'
        />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
    </div>
  );
}

export default GPTSearch; 
