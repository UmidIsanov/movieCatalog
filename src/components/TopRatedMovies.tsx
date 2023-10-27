import  { useEffect, useState } from "react";
import "../RatedMovies.css";
import { Movie as MovieI } from "../types/movieTypes";
import MovieCard from "./MovieCard";
import loaderGIF from '../assets/loaderGif.gif'
const url ="https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

function TopRatedMovies() {
  const [topMovies, setTopMovies] = useState<MovieI[]>([]);
const  [isLoading, setIsLoading]= useState<boolean>(true)

  useEffect(() => {
    
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data);
        setTopMovies(data.results);
        setIsLoading(false)
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

if(isLoading){
return (
  <div className="loaderGif"><img src={loaderGIF} alt="loader" /></div>

)}

  return (
    <div className="container">
      <div className="movies-container">
        {topMovies.map((movie) => (
         <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default TopRatedMovies;
