import TVShowCard from "./TVShowCard"

const TVShowList = ({title, tvShows}) => {
  return (
    <div className='px-2 md:px-10 pt-5'>
      {title && <h1 className='m-2 text-sm md:text-md lg:text-xl text-white font-medium'>{title}</h1>}
      <div className='flex overflow-x-scroll  scroll-snap-x '>
        {tvShows?.map((tvShow) => (
          <TVShowCard 
            key={tvShow.id} 
            posterPath={tvShow.poster_path} 
            tvShowId={tvShow.id}
            tvShow={tvShow}
          />
        ))}
      </div>
    </div> 
  );
}

export default TVShowList;
