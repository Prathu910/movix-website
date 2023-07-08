import React, { useEffect, useState } from "react";
import "./Details.scss";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import { fetchDataFromApi } from "../../Utils/api";
import Img from "../../Components/LazyLoadImg/Img";

const Details = () => {
  const { mediaType, id } = useParams();
  const baseUrl = import.meta.env.VITE_IMG_BASE_URL;
  const endPoint = mediaType === "movie" ? `movie/${id}` : `tv/${id}`;

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDataFromApi(endPoint).then((res) => {
      console.log("inside");
      console.log(res, "details", mediaType);
      setData(res);
      //   setData(mediaType === "movie" ? res : res.results);
    });
  }, [mediaType]);

  if (data.length < 1) return <Loader />;
  return (
    <>
      <div className="content-detail">
        <Img
          src={data.backdrop_path ? `${baseUrl}${data.backdrop_path}` : ""}
          alt="backdrop"
        />
      </div>
      <div className="opacity-layer"></div>
      <div className="content">
        <div className="hero-section">
          <div className="poster">
            <img src={`${baseUrl}${data.poster_path}`} alt="poster" />
          </div>
          <div className="movie-summary">
            <div className="title">
              <h2>{data.title}</h2>
            </div>
            <div className="genre">
              {data.genres.map((genre) => (
                <span>{genre.name}</span>
              ))}
            </div>
            <div className="overview">
              <h2>Overview</h2>
              <p>{data.overview ?? "No Overview present"}</p>
            </div>
            <div className="stats">
              <div className="release-info">
                <p>
                  Status: <span>{data.status}</span>
                </p>
                <p>
                  Release Date: <span>{data.release_date}</span>
                </p>
                <p>
                  Runtime: <span>{data.runtime} Minutes</span>
                </p>
              </div>
              <hr />
              <div className="director">
                <p>
                  Director: <span>David Yates</span>
                </p>
              </div>
              <hr />
              <div className="writer">
                <p>
                  Writer: <span>Steve Kloves</span>
                </p>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
