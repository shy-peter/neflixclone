import React, { useContext, useEffect, useState, useCallback } from "react";
import { getPopularMovies, shuffleArray } from "../api/movieApi";
import Movie from "./Movie";
import { FaPlus } from "react-icons/fa";
import { movieContext } from "../context/MovieContext";

// Helper function for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);
  const [error, setError] = useState(null);

  const { myList, setMyList, handleFavorite, searchQuery } =
    useContext(movieContext);

  // Debouncing searchQuery to minimize API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch popular movies only once
  const getMovies = useCallback(async () => {
    try {
      const movies = await getPopularMovies();
      const shuffledMovies = shuffleArray(movies);
      setMovies(shuffledMovies);
    } catch (err) {
      setError("Failed to fetch popular movies. Please try again.");
    }
  }, []);

  // Fetch movies based on search query
  const fetchMovies = useCallback(async (query) => {
    if (!query) return; // Don't fetch if no query

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`, // Use environment variable for the API key
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovieSearch(data.results);
      setError(null); // Clear any previous error
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovieSearch([]);
    }
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  // Trigger search when the debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      fetchMovies(debouncedSearchQuery);
    } else {
      setMovieSearch([]); // Clear search results if the query is empty
    }
  }, [debouncedSearchQuery, fetchMovies]);

  return (
    <div className="w-full bg-gradient-to-r h-screen from-blue-500 via-green-500 via-yellow-500 via-red-500 to-purple-500">
      <p>WE Think You'll Love These</p>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4">
        {(debouncedSearchQuery ? movieSearch : movies)
          .filter((item) =>
            item.title
              .toLowerCase()
              .startsWith(debouncedSearchQuery.toLowerCase())
          )
          .map((item, idx) => (
            <Movie
              idx={idx}
              key={item.id}
              item={item}
              handleFavorite={handleFavorite}
              cardAction={<FaPlus />}
            />
          ))}
      </div>
    </div>
  );
};

export default Movies;
