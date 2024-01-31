import React, { useEffect, useState, useRef } from "react";
import "./NowPlayingList.css";
import arrowRight from "../../assets/Icons/Icon.svg";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

type Movie = {
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
};

const TopTvShows = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(5);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url =
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
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

  const showNextCards = () => {
    setCurrentOffset((prevOffset) => (prevOffset + 1) % movies.length);
  };

  const showPreviousCards = () => {
    setCurrentOffset(
      (prevOffset) => (prevOffset - 1 + movies.length) % movies.length
    );
  };

  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="Wrapper-title">Top Rated TV Shows</h2>
      <div className="ListPopular-wrapper">
        <img
          src={arrowRight}
          alt="prevImage"
          className="arrowLeft"
          onClick={showPreviousCards}
        />
        <div className="ListPopularMovieList" ref={listRef}>
          {Array.from({ length: visibleCards }).map((_, index) => (
            <Link
              to={`/movie/${
                movies[(currentOffset + index) % movies.length].id
              }`}
            >
              <MovieCard
                key={movies[(currentOffset + index) % movies.length].id}
                movie={movies[(currentOffset + index) % movies.length]}
                currentIndex={(currentOffset + index) % movies.length}
                index={index}
              />
            </Link>
          ))}
        </div>
        <img
          src={arrowRight}
          alt="nextMovie"
          className="arrowRight"
          onClick={showNextCards}
        />
      </div>
    </div>
  );
};

export default TopTvShows;
