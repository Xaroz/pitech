import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <header>
      <ul className="navbar">
        <li className="option">
          <Link to="/">Ejercicio 1</Link>
        </li>
        <li className="option">
          <Link to="/exercise2">Ejercicio 2</Link>
        </li>
      </ul>
    </header>
  );
};
