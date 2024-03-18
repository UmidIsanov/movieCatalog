import React, { FC, useEffect, useState } from "react";

type Movie = {
  id: number;
  original_title: string;
  backdrop_path: string;
};

type PopularMovieProps = {};

const NowPlayingMovies: FC<PopularMovieProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>играющие</p>
      {/* {movies.map((movie) => (
        <div key={movie.id}>
          <p>{movie.original_title}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={`${movie.original_title} Backdrop`}
          />
        </div> */}
      {/* ))} */}
    </div>
  );
};

export default NowPlayingMovies;
