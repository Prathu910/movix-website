import React, { useContext } from "react";
import { Context } from "../../Context/AppContext";
import Loader from "../Loader/Loader";
import Carousel from "../Carousel/Carousel";

const TrendingShows = () => {
  const { trendingShows } = useContext(Context);
  if (trendingShows.length < 1) return <Loader />;

  return (
    <div className="trending-shows-carousel">
      <Carousel data={trendingShows} title="Trending Shows" />
    </div>
  );
};

export default TrendingShows;
