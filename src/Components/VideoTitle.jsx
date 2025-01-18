
const VideoTitle = ({title,overview }) => {
  return (
    <div className='p-32 pt-80 w-screen flex flex-col absolute aspect-video bg-gradient-to-r from-black to-transparent'>
      <h1 className='text-5xl font-bold text-white'>{title}</h1>
      <p className='p-2 w-3/4 text-sm text-white font-light break-words'>
        {overview}
      </p>
      <div className='flex'>
        <button className='m-2 py-2 px-10 font-bold bg-white rounded-md  cursor-pointer hover:bg-opacity-70'>
          ▶ Play
        </button>
        <button className='m-2 py-2 px-5 text-white font-bold bg-gray-400 rounded-md bg-opacity-60 cursor-pointer hover:bg-opacity-50'>
          ⓘ More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle
