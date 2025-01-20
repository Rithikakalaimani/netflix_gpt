import MovieCard from "./MovieCard"

 const MovieList = ({title,movies}) => {
  return (
    <div className='px-10 pt-5'>
      <h1 className='m-2 text-xl text-white font-medium'>{title}</h1>
      <div className='flex overflow-x-scroll scroll-snap-x'>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
 }
export default MovieList;
 