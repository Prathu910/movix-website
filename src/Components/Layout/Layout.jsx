import React from "react";
import "./Layout.scss";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
