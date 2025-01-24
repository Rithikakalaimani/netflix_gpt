
const VideoTitle = ({title,overview }) => {
  return (
    <div className='p-5 pt-16 md:p-10 md:pt-36 lg:p-28 lg:pt-60  w-screen flex flex-col absolute aspect-video bg-gradient-to-r from-black to-transparent'>
      <h1 className='text-sm pl-2 md:text-2xl lg:pl-0 lg:text-5xl font-bold text-white'>
        {title}
      </h1>
      <p className='p-2 w-3/4 text-[6px] md:block md:text-sm text-white font-light break-words'>
        {overview}
      </p>
      <div className='flex'>
        <button className='m-2 p-2 px-5 md:py-2 text-xs md:text-lg md:px-10 font-bold bg-white rounded-md  cursor-pointer hover:bg-opacity-70'>
          ▶ Play
        </button>
        <button className='m-2 p-2 md:py-2 text-xs md:text-lg md:px-5 text-white font-bold bg-gray-400 rounded-md bg-opacity-60 cursor-pointer hover:bg-opacity-50'>
          ⓘ More Info
        </button>
      </div>
      {/* <div className=' w-screen mt-5 z-80 h-10 bg-white'></div> */}
    </div>
  );
}

export default VideoTitle



