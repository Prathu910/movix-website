import React, { useEffect, useState, useContext } from "react";
import "./Home.scss";
import { Context } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import TrendingMovies from "../../Components/TrendingMovies/TrendingMovies";
import TrendingShows from "../../Components/TrendingShows/TrendingShows";
import UpcomingMovies from "../../Components/UpcomingMovies/UpcomingMovies";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bg, setBg] = useState("");
  const { topMovies } = useContext(Context);
  const baseUrl = import.meta.env.VITE_IMG_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (topMovies.length > 1) {
      const bgUrl = `${baseUrl}${
        topMovies[Math.floor(Math.random() * topMovies.length)].backdrop_path
      }`;
      setBg(bgUrl);
    }
  }, [topMovies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 1) {
      navigate(`search/${searchTerm}`);
    }
  };

  if (topMovies.length < 1) return <h1>Loading...</h1>;

  return (
    <>
      <div className="hero-banner">
        <div className="hero-img">
          <img src={bg} alt="hero-banner" />
        </div>
        <div className="hero-content">
          <div className="title">
            <h1>Welcome.</h1>
            <p>
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
          </div>
          <div className="opacity-layer"></div>
          <div className="search-box">
            <form className="search-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="search for a movie or a tv show.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      <TrendingMovies />
      <TrendingShows />
      <UpcomingMovies />
    </>
  );
};

export default Home;
