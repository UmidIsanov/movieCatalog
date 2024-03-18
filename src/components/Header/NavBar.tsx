import React from "react";
import "./NavBar.css";
import movieDBIcon from "../../assets/moviedb_icon.png";
import SearchInput from "../SearchComponent/SearchInput";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="primary_nav">
      <div className="navigation">
        <div className="leftSection">
          <Link to="/">
            <img src={movieDBIcon} alt="MovieLogo" className="MovieLogo" />
          </Link>
        </div>
        <div className="rightSection">
          <SearchInput />
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
