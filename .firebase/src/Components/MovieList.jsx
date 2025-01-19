import MovieCard from "./MovieCard"

 const MovieList = ({title,movies}) => {
  console.log(movies);
   return (
     <div className="p-10">
       <h1 className="m-2 text-2xl">{title}</h1>
       <div className="">
         <div className="flex">
           {movies?.map((movie) => (
             <MovieCard key={movie.id} posterPath={movie.poster_path} />
           ))}
         </div>
       </div>
     </div>
   );
 }
 
 export default MovieList;
 