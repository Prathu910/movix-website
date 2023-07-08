import React, { useEffect, useState } from "react";
import "./Search.scss";
import { Link, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../Utils/api";
import fallBackPoster from "../../assets/no-poster.png";
import Img from "../../Components/LazyLoadImg/Img";
import Loader from "../../Components/Loader/Loader";

const Search = () => {
  const { id } = useParams();
  const [searchResult, setSearchresult] = useState([]);
  const baseUrl = import.meta.env.VITE_IMG_BASE_URL;
  useEffect(() => {
    fetchDataFromApi(`search/multi?query=${id}`).then((res) => {
      setSearchresult(res.results);
    });
  }, [id]);

  console.log(searchResult);

  if (searchResult.length < 1) return <Loader />;

  return (
    <div className="searchResults">
      <h2>Search results of "{id}"</h2>
      <div className="searchResultsContent">
        {searchResult.map((movie) => (
          <div className="movie">
            <Link key={movie.id} to={`/movies/${movie.id}`}>
              <div className="poster">
                <Img
                  src={
                    movie.poster_path
                      ? `${baseUrl}${movie.poster_path}`
                      : fallBackPoster
                  }
                  alt="poster"
                />
              </div>
              <div className="info">
                <h4 className="title">{movie.title ?? movie.original_name}</h4>
                <p>{movie.release_date ?? movie.first_air_date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
