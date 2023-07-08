import React, { useContext } from "react";
import { Context } from "../../Context/AppContext";
import Loader from "../Loader/Loader";
import Carousel from "../Carousel/Carousel";

const TrendingMovies = () => {
  const { trendingMovies } = useContext(Context);
  if (trendingMovies.length < 1) return <Loader />;

  return (
    <div className="trending-movies-carousel">
      <Carousel data={trendingMovies} title="Trending Movies" />
    </div>
  );
};

export default TrendingMovies;
