import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import arrowRight from "../../assets/Icons/Icon.svg";

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
const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState(5);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

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
      <h2 className="Wrapper-title">Popular</h2>
      <div className="ListPopular-wrapper">
        <img
          src={arrowRight}
          alt="prevImage"
          className="arrowLeft"
          onClick={showPreviousCards}
        />
        <div className="ListPopularMovieList" ref={listRef}>
          {Array.from({ length: visibleCards }).map((_, index) => (
            <MovieCard
              key={movies[(currentOffset + index) % movies.length].id}
              movie={movies[(currentOffset + index) % movies.length]}
              currentIndex={(currentOffset + index) % movies.length}
              index={index}
            />
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

export default PopularMovies;
