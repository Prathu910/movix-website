import React, { useRef } from "react";
import "./Carousel.scss";
import { Link, useNavigate } from "react-router-dom";
import PosterFallBack from "../../assets/no-poster.png";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import CircleRating from "../CricleRating/CircleRating";
import Img from "../LazyLoadImg/Img";
import dayjs from "dayjs";

const Carousel = ({ data, title }) => {
  const carouselContainer = useRef();
  const baseUrl = import.meta.env.VITE_IMG_BASE_URL;

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel">
      <div className="carousel-wrapper">
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        <div className="carouselItems" ref={carouselContainer}>
          {data?.map((item) => {
            const posterUrl = item.poster_path
              ? `${baseUrl}${item.poster_path}`
              : PosterFallBack;
            return (
              <div key={item.id} className="carouselItem">
                <Link to={`movies/${item.id}`}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    {/* <Genres
                                                    data={item.genre_ids.slice(0, 2)}
                                                /> */}
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date || item.first_air_date).format(
                        "MMM D, YYYY"
                      )}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
