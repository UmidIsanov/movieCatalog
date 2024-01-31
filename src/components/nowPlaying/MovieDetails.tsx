import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieDBIcon from "../../assets/moviedb_icon.png";
import { Link } from "react-router-dom";

import "./MovieDeteil.css";
import SearchInput from "../SearchInput";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        };

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Failed to fetch movie details: ${response.status}`);
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="MovieDetails">
      <div className="head">
        <div className="leftSection">
          <Link to="/">
            <img src={movieDBIcon} alt="MovieLogo" className="MovieLogo" />
          </Link>
        </div>
        <div className="rightSection">
          <SearchInput />
        </div>
      </div>
      <div className="MovieBody">
        <div className="leftSide">
          <div className="img">
            <img
              src={`https://image.tmdb.org/t/p/original${
                movieDetails.backdrop_path
                  ? movieDetails.backdrop_path
                  : movieDetails.poster_path
              }`}
              alt=""
              className="backImage"
            />
          </div>
          <div className="rightSide">
            <h2 className="MovieTitle">
              {movieDetails.original_title
                ? movieDetails.original_title
                : movieDetails.poster_path}
            </h2>

            <p className="releaseDate">
              Release date: {movieDetails.release_date}
            </p>
            <p className="Budget">budget: {movieDetails.budget}$</p>
            <p className="overView"> Popularity: {movieDetails.popularity}</p>
            <p className="overView">{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
