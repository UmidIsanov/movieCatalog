import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import MovieDetails from "./components/nowPlaying/MovieDetails";
import PopularPeople from "./components/people/PopularPeople";
import "./App.css";
import PersonDetails from "./components/people/PersonDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/people" element={<PopularPeople />} />
      <Route
        path="/person/:id"
        element={
          <PersonDetails
            person={{
              id: undefined,
              name: undefined,
              popularity: undefined,
              profile_path: undefined,
            }}
          />
        }
      />
    </Routes>
  );
};

export default App;
