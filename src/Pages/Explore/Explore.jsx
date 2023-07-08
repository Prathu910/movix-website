import React, { useState, useEffect } from "react";
import "./Explore.scss";
import { useParams, Link } from "react-router-dom";
import { fetchDataFromApi } from "../../Utils/api";
import Loader from "../../Components/Loader/Loader";
import Img from "../../Components/LazyLoadImg/Img";
import FallBackPoster from "../../assets/no-poster.png";

const Explore = () => {
  const { mediaType } = useParams();
  let endPoint = mediaType === "movies" ? "discover/movie" : "discover/tv";

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [sortValue, setSortValue] = useState("popularity.desc");
  const [genreId, setGenreId] = useState("");
  const [genre, setGenre] = useState([]);
  const baseUrl = import.meta.env.VITE_IMG_BASE_URL;

  useEffect(() => {
    fetchDataFromApi(
      `${endPoint}?sort_by=${sortValue}&with_genres=${genreId}&language=en-US`
    ).then((res) => {
      setData(res.results);
      console.log(res, "expore section", mediaType);
    });

    fetchDataFromApi("genre/movie/list").then((res) => {
      setGenre(res.genres);
      console.log(res.genres, "al; genres");
    });

    console.log(genreId);
  }, [mediaType, sortValue, genreId]);

  const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

  if (data.length < 1) return <Loader />;

  return (
    <div className="explore-container">
      <div className="content-header">
        <h1>Explore {mediaType === "movies" ? "Movies" : "Shows"}</h1>
        <div className="filter">
          <div className="sort-filter">
            <select
              name="filter"
              onChange={(e) => setSortValue(e.target.value)}
            >
              {sortbyData.map((filter) => (
                <option key={filter.label} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
          <div className="genre-filter">
            <select
              name="filter"
              onChange={(e) =>
                setGenreId((prev) => {
                  if (prev.length > 0) return `${prev},${e.target.value}`;
                  return e.target.value;
                })
              }
            >
              {genre.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="applied-filters">
        <div className="applied-filter">
          <p>Action</p>
          <p>X</p>
        </div>
      </div>
      <div className="contents">
        {data.map((content) => (
          <div key={content.id} className="content">
            <Link
              to={`/${mediaType === "movies" ? "movie" : "show"}/${content.id}`}
            >
              <div className="poster">
                <Img
                  src={
                    content.poster_path
                      ? `${baseUrl}${content.poster_path}`
                      : FallBackPoster
                  }
                />
              </div>
              <div className="info">
                <h4 className="title">
                  {content.title ?? content.original_name}
                </h4>
                <p>{content.release_date ?? content.first_air_date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
