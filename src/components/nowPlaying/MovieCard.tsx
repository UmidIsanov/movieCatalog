import React from "react";
import { Link } from "react-router-dom";
import "./NowPlaying.css";

type MovieCardProps = {
  movie: {
    id?: number;
    original_title?: string;
    poster_path?: string;
    overview?: string;
    original_language?: string;
    popularity?: number;
    release_date?: string;
    title?: string;
    vote_average?: number;
    vote_count?: number;
    backdrop_path?: string;
    original_name?: string;
    name?: string;
  };
  currentIndex: number;
  index: number;
};

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  currentIndex,
  index,
}) => {
  const movieId = movie.id;

  return (
    <Link to={`/movie/${movieId}`}>
      <div className="MovieCard">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.original_title}
          className="cardImage"
        />
        <h3 className="popularity">
          <div>{movie.release_date}</div>
        </h3>{" "}
        <h2 className="cardTitle">{movie.title || movie.name}</h2>
      </div>
    </Link>
  );
};

export default MovieCard;
