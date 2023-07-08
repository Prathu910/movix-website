import React, { useContext } from "react";
import { Context } from "../../Context/AppContext";
import Loader from "../Loader/Loader";
import Carousel from "../Carousel/Carousel";

const UpcomingMovies = () => {
  const { upcomingMovies } = useContext(Context);
  if (upcomingMovies.length < 1) return <Loader />;

  return (
    <div className="upcoming-movie-carousel">
      <Carousel data={upcomingMovies} title="Upcoming Movies" />
    </div>
  );
};

export default UpcomingMovies;
