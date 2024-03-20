import React from "react";
import "./MainPage.css";
import Carusel from "./Header/Carusel";
import NavBar from "./Header/NavBar";
import NowPlayingFilmsList from "./nowPlaying/NowPlayingList";
import PopularMovies from "./nowPlaying/PopularMovies";
import PopularPeople from "./people/PopularPeople";
import TopTvShows from "./nowPlaying/TopTVShows";
import { Container } from "@mui/material";
import PopularMovie from "./PopularMovie/PopularMovie";

const MainPage = () => {
  return (
    <>
      <header className="header">
        <NavBar />
        <Carusel />
      </header>
      <Container>
        <NowPlayingFilmsList />
        <PopularMovies />
        <PopularPeople />
        <TopTvShows />
        <PopularMovie />
      </Container>
    </>
  );
};

export default MainPage;
