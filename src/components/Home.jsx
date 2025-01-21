import React from "react";
import MovieDisplay from "./MovieDisplay";
import Movies from "./Movies";
import Trash from "./Trash";
import Movie from "./Movie";
import { Routes } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <MovieDisplay />

      <Movies />
    </div>
  );
};

export default Home;
