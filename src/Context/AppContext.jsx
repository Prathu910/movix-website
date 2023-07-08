import React, { useEffect, useState, createContext } from "react";
import { fetchDataFromApi } from "../Utils/api";

export const Context = createContext();

// Top rated endpoint = movie/top_rated?language=en-US&page=1
// Upcoming Movie endpoint = movie/upcoming?language=en-US&page=1
// Trending Tv shows = trending/tv/day?language=en-US  {day or week}
// Trending Movies = trending/movie/day?language=en-US {day or week}

const AppContext = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingShows, setTrendingShows] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrendingMovies = () => {
    setLoading(true);
    fetchDataFromApi("trending/movie/day?language=en-US").then((res) => {
      setLoading(false);
      console.log(res, "trendMovies");
      setTrendingMovies(res.results);
    });
  };

  const fetchTrendingShows = () => {
    setLoading(true);
    fetchDataFromApi("trending/tv/day?language=en-US").then((res) => {
      setLoading(false);
      console.log(res, "trendShows");
      setTrendingShows(res.results);
    });
  };

  const fetchTopMovies = () => {
    setLoading(true);
    fetchDataFromApi("movie/top_rated?language=en-US&page=1").then((res) => {
      setLoading(false);
      console.log(res, "topMovies");
      setTopMovies(res.results);
    });
  };

  const fetchUpcomingMovies = () => {
    setLoading(true);
    fetchDataFromApi("movie/upcoming?language=en-US&page=1").then((res) => {
      setLoading(false);
      console.log(res, "upcomingMovies");
      setUpcomingMovies(res.results);
    });
  };

  useEffect(() => {
    fetchTopMovies();
    fetchUpcomingMovies();
    fetchTrendingMovies();
    fetchTrendingShows();
  }, []);

  return (
    <Context.Provider
      value={{
        trendingMovies,
        trendingShows,
        topMovies,
        upcomingMovies,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
