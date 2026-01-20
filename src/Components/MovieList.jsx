import MovieCard from "./MovieCard"

 const MovieList = ({title,movies}) => {
  return (
    <div className='px-2 md:px-10 pt-5'>
      {title && <h1 className='m-2 text-sm md:text-md lg:text-xl text-white font-medium'>{title}</h1>}
      <div className='flex overflow-x-scroll  scroll-snap-x '>
        {movies?.map((movie) => (
          <MovieCard 
            key={movie.id} 
            posterPath={movie.poster_path} 
            movieId={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div> 
  );
 }
export default MovieList;
 