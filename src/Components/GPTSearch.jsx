import { BG_IMG_URL } from "../Utils/constant";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";

const GPTSearch = () => {
  return (
    <>
      <div className='fixed -z-20'>
        <img
          className='w-screen h-screen object-cover'
          src={BG_IMG_URL}
          alt='bg'
        />
      </div>
      <div>
      <GPTSearchBar />
      <GPTMovieSuggestions />
      </div>
    </>
  );
}
export default GPTSearch; 
