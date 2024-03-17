import React, { useEffect, useState } from "react";
import "./SearchInput.css";
import useDebounce from "../hooks/useDebounce";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Movie } from "../types/movieTypes";
import { Container, Button } from "@mui/material";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchedFilms, setSearchedFilms] = useState<Movie[]>([]);
  const debouncedValue = useDebounce({ value: inputValue, delay: 500 });
  const [showAll, setShowAll] = useState<boolean>(false);

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

        setSearchedFilms(data.results.slice(0, 5) as Movie[]);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchData();
  }, [debouncedValue]);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Container>
        <TextField
          id="outlined-basic"
          label="Search"
          type="search"
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            color: "white",
            borderBottom: "none",
            "& .MuiInputBase-root": {
              padding: "0 10px",
            },

            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInput-root": {
              color: "white",
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(0, 1.5px) scale(0.75)",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgb(236, 233, 233)",
            },
          }}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />

        {searchedFilms.length > 0 && (
          <ul className="movieList">
            {searchedFilms.map((film, index) => {
              return (
                <li key={film.id}>
                  <Link to={`/movie/${film.id}`}>
                    <div className="searchedMovies">
                      <img
                        src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                        alt="MovieImg"
                        className="imgSearchedFilm"
                      />
                      <p className="nameMovie">{film.name} </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {!showAll && searchedFilms.length > 5 && (
          <Button onClick={handleShowAll}>Показать все</Button>
        )}

        {showAll && searchedFilms.length > 5 && (
          <ul className="movieList">
            {searchedFilms.slice(5).map((film) => {
              return (
                <li key={film.id}>
                  <Link to={`/movie/${film.id}`}>
                    <div className="searchedMovies">
                      <img
                        src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                        alt="MovieImg"
                        className="imgSearchedFilm"
                      />
                      <p className="nameMovie">{film.name} </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </Box>
  );
};

export default SearchInput;
