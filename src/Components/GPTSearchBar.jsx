import React from 'react'
import lang from '../Utils/languageConstants'
import {useSelector} from "react-redux";
const GPTSearchBar = () => {
  const langKey = useSelector(store=>store.config.lang)
  return (
    <div className='bg-black'>
      <form className='pt-5 p-10'>
        <div className='mt-10 pt-10 flex justify-center'>
          <input
            type='text'
            className='m-2 p-2 w-5/6 rounded-md outline-none '
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button className='m-2 p-2 px-5  text-white bg-red-600 rounded-md hover:bg-red-700'>
            {lang[langKey].search}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GPTSearchBar
