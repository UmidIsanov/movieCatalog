import React, { useState } from "react";

import arrowLeft from "../../assets/arrow.png";
import styles from "./Carusel.module.css";
import { useEffect } from "react";
import playIcon from "../../assets/Play.svg";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
  original_language: string;
  popularity: number;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
};

const Carusel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url =
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
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
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchData();
  }, []);

  const [activeImage, setActiveImage] = useState(0);
  const nextImage = () => {
    if (activeImage === movies.length - 1) {
      setActiveImage(0);
    } else {
      setActiveImage(activeImage + 1);
    }
  };
  const prevImage = () => {
    if (activeImage === 0) {
      setActiveImage(movies.length - 1);
    } else {
      setActiveImage(activeImage - 1);
    }
  };

  const watchTrailer = () => {
    const movie = movies[activeImage];

    const movieTitle = encodeURIComponent(movie.title);

    if (movieTitle) {
      const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${movieTitle}/traller`;

      window.open(youtubeSearchUrl, "_blank");
    } else {
      console.warn("Movie title not available");
    }
  };
  if (movies.length === 0) return <div>Loading...</div>;
  return (
    <div className={styles.carusel}>
      <img
        src={arrowLeft}
        alt="right"
        onClick={nextImage}
        style={{ transform: "rotate(180deg)" }}
        className={styles.arrowLeft}
      />
      <img
        src={`https://image.tmdb.org/t/p/original${movies[activeImage].backdrop_path}`}
        alt="assa"
        className={styles.caruselPhoto}
      />

      <Container>
        <Link to={`/movie/${movies[activeImage].id}`}>
          <h1 className={styles.movieTitle}>{movies[activeImage].title}</h1>
        </Link>{" "}
        <p className={styles.movieOverview}>{movies[activeImage].overview}</p>
        <button className={styles.PropsButton} onClick={watchTrailer}>
          <img src={playIcon} alt="playIcon" className="PlayIcon" />
          Watch trailer
        </button>
        <img
          src={arrowLeft}
          alt="right"
          onClick={prevImage}
          className={styles.arrowRight}
        />
      </Container>
    </div>
  );
};

export default Carusel;
