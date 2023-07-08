import "./Header.scss";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h2>Movix</h2>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="explore/movies">Movies</Link>
          <Link to="explore/shows">TV Shows</Link>
          <BiSearchAlt2 />
        </div>
      </div>
    </div>
  );
};

export default Header;
