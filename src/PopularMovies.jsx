import React, { useEffect, useState } from "react";
import "./PopularMovie.css";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGYzODVhOTFjNzFkZTg1NmQzN2RlNTY0YzE0OTM0MSIsInN1YiI6IjY1MzMxYzNmN2FkZjY3ZDQ0NTFkODIwYmVhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AT_xMD44cBDoX_BoBRj2zhe65WyudTXskeWMnILWgnk";

function PopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <div className="conteiner">
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.name}
            <img
              className="img"
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt="Фоновое изображение"
            />
          </li>
        ))}
      </div>
      <h1>Популярные фильмы</h1>
      <ul></ul>
    </div>
  );
}

export default PopularMovies;
