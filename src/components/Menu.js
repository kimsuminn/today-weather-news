import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faSun } from "@fortawesome/free-regular-svg-icons";
import "../style/Menu.css";

function Menu() {

  const { pathname } = useLocation();

  return (
    <div className="menu">
      <div className="side_wrap">
        <div className={`${pathname === '/' ? "side_menu" : "side_menu on"}`}>
          <div className="weather_btn">
            <Link to='/'><FontAwesomeIcon icon={faSun} /></Link>
          </div>
          <div className="news_btn">
            <Link to='/news'><FontAwesomeIcon icon={faNewspaper} /></Link>
          </div>
        </div>
      </div>
      <div className="bottom_wrap">
        <div className={`${pathname === '/' ? "bottom_menu" : "bottom_menu on"}`}>
          <div className="weather_btn">
            <Link to='/'><FontAwesomeIcon icon={faSun} /></Link>
          </div>
          <div className="news_btn">
            <Link to='/news'><FontAwesomeIcon icon={faNewspaper} /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu;