import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonCard from "../people/PersonCard";
import MovieCard from "./MovieCard";
import NavBar from "../Header/NavBar";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "./MovieDeteil.css";
import { Container } from "@mui/material";

interface CastMember {
  id?: number;
  name?: string;
  character?: string;
  credit_id?: string;
  gender?: string;
  known_for_department?: string;
  order?: number;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<any | null>(null);
  const [movieCast, setMovieCast] = useState<CastMember[]>([]);
  const [visibleCards, setVisibleCards] = useState(4);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [movieImages, setMovieImages] = useState<any | null>(null);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [currentSimilarOffset, setCurrentSimilarOffset] = useState(0);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;

        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const movieCastUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
        const movieImagesUrl = `https://api.themoviedb.org/3/movie/${id}/images`;
        const movieSimilarUrl = `https://api.themoviedb.org/3/movie/${id}/similar`;

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        };

        const [
          movieDetailsResponse,
          movieCastResponse,
          movieImagesResponse,
          movieSimilarResponse,
        ] = await Promise.all([
          fetch(movieDetailsUrl, options),
          fetch(movieCastUrl, options),
          fetch(movieImagesUrl, options),
          fetch(movieSimilarUrl, options),
        ]);

        if (
          !movieDetailsResponse.ok ||
          !movieCastResponse.ok ||
          !movieImagesResponse.ok ||
          !movieSimilarResponse.ok
        ) {
          throw new Error("Failed to fetch movie details");
        }

        const [movieDetails, movieCast, movieImagesData, similarMoviesData] =
          await Promise.all([
            movieDetailsResponse.json(),
            movieCastResponse.json(),
            movieImagesResponse.json(),
            movieSimilarResponse.json(),
          ]);

        setMovieDetails(movieDetails);
        setMovieCast(movieCast.cast || []);
        setMovieImages(movieImagesData);
        setSimilarMovies(similarMoviesData.results || []);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  const showNextCards = () => {
    setCurrentOffset((prevOffset) => (prevOffset + 1) % movieCast.length);
  };

  const showPreviousCards = () => {
    setCurrentOffset(
      (prevOffset) => (prevOffset - 1 + movieCast.length) % movieCast.length
    );
  };

  const showNextSimilarMovies = () => {
    setCurrentSimilarOffset(
      (prevOffset) => (prevOffset + 1) % similarMovies.length
    );
  };

  const showPreviousSimilarMovies = () => {
    setCurrentSimilarOffset(
      (prevOffset) =>
        (prevOffset - 1 + similarMovies.length) % similarMovies.length
    );
  };

  if (!movieDetails || !movieImages) {
    return <div>Loading...</div>;
  }

  const randomNumber = Math.floor(Math.random() * 10);
  const posterImage = movieImages.backdrops[4].file_path;

  return (
    <>
      <NavBar />
      <section className="mainInfo">
        <div className="backgroundImage">
          {posterImage && (
            <img
              src={`https://image.tmdb.org/t/p/original${posterImage}`}
              alt="Poster"
              className="posterImage"
            />
          )}
          <div className="movieDeteilData">
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
              alt=""
              className="moviePosterImage"
            />
            <div className="movieMainData">
              <p className="movieTitle">{movieDetails.title}</p>
              <p className="tagline">Overiview</p>
              <p className="movieOverView">{movieDetails.overview}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="castMembersWrapper">
        <h2 className="CastText">Cast</h2>
        <KeyboardArrowLeftIcon
          style={{ fontSize: "74px" }}
          className="leftArrow"
          onClick={showPreviousCards}
        />
        <div className="castMembers">
          {Array.from({ length: visibleCards }).map((_, index) => {
            const actor = movieCast[(currentOffset + index) % movieCast.length];
            if (!actor) return null;
            return (
              <PersonCard
                key={actor.id}
                person={{
                  ...actor,
                  popularity: actor.popularity?.toString() || "Unknown",
                }}
              />
            );
          })}
        </div>
        <KeyboardArrowRightIcon
          style={{ fontSize: "74px" }}
          className="rightArrow"
          onClick={showNextCards}
        />
      </div>

      <div className="similarMovies">
        <h2>Similar Movies</h2> 
        <KeyboardArrowLeftIcon
          style={{ fontSize: "74px" }}
          className="leftArrowMovie"
          onClick={showPreviousSimilarMovies}
        />
        <div className="similarMoviesContainer">
          {similarMovies
            .slice(currentSimilarOffset, currentSimilarOffset + visibleCards)
            .map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                currentIndex={index}
                index={index}
              />
            ))}
        </div>
        <KeyboardArrowRightIcon
          style={{ fontSize: "74px" }}
          className="rightArrowMovie"
          onClick={showNextSimilarMovies}
        />
      </div>
    </>
  );
};

export default MovieDetails;
