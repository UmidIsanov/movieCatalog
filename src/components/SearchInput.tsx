import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchInput.css";
import useDebounce from "../hooks/useDebounce";
import { Link } from "react-router-dom";

import { Movie } from "../types/movieTypes";
const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchedFilms, setSearchedFilms] = useState<Movie[]>([]);
  const debouncedValue = useDebounce({ value: inputValue, delay: 500 });
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/search/tv?query=${inputValue}`;
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

        setSearchedFilms(data.results as Movie[]);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchData();
  }, [debouncedValue]);

  const handleChange = (value: string) => {
    setInputValue(value);
  };
  return (
    <div className="input_wr">
      <FaSearch className="search_icon" />
      <input
        type="text"
        placeholder="Type to search..."
        className="searchInput"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      {searchedFilms.length > 0 && (
        <ul className="movieList">
          {searchedFilms.map((film) => {
            return (
              <li key={film.id} className="searchedMovies">
                <Link to={`/movie/${film.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                    alt="assa"
                    className="imgSearchedFilm"
                  />{" "}
                  {film.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
