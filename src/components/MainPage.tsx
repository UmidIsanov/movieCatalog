import React from "react";
import "./MainPage.css";
import Carusel from "./Carusel";
import NavBar from "./NavBar";
import NowPlayingFilmsList from "./nowPlaying/NowPlayingList";
import PopularMovies from "./nowPlaying/PopularMovies";
import PopularPeople from "./people/PopularPeople";
import TopTvShows from "./nowPlaying/TopTVShows";

const MainPage = () => {
  return (
    <div>
      <header className="header">
        <NavBar />
        <Carusel />
      </header>
      <body>
        <NowPlayingFilmsList />
        <PopularMovies />
        <PopularPeople />
        <TopTvShows />
      </body>
    </div>
  );
};

export default MainPage;
