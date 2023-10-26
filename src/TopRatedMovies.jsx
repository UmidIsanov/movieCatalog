import React, { useEffect, useState } from "react";
import "./RatedMovies.css";

function TopRatedMovies() {
  const [topMovies, setTopMovies] = useState([]);
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGYzODVhOTFjNzFkZTg1NmQzN2RlNTYwYzE0OTM0MSIsInN1YiI6IjY1MzMxYzNmN2Y2YzhkMDEyZGQ1OTQ2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AT_xMD44cBDoX_BoBRj2zhe65WyudTXskeWMnILWgnk"; // Замените на ваш API ключ

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTopMovies(data.results);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="movies-container">
        {topMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.name}
              className="movie-poster"
            />
            <h2 className="movie-title">{movie.name}</h2>
            <p className="movie-rating">Рейтинг: {movie.vote_average}</p>
            <p className="movie-release-date">
              Дата выхода: {movie.first_air_date}
            </p>
            <p className="movieFrom">
              Страна произвотсво: {movie.origin_country}
            </p>
            <p className="movie-overview">Описание: {movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRatedMovies;
