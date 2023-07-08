import React from "react";
import "./Loader.scss";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <InfinitySpin width="300" color="#E3FCC3" />
    </div>
  );
};

export default Loader;
