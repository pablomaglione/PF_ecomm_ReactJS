import "../css/style.css"
import React from "react";
import imgLogo from "../assets/img/logo_size.png"
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm bg-light">
        <div>
          <Link className="navbar-brand" to={"/"}>
            <img width="100" src={imgLogo} alt="logo" />
          </Link>
        </div>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav" style={{fontFamily: 'Abril Fatface', fontSize: "1.5rem"}}>
              <Link className="nav-link active" aria-current="page" to={"/"}>Inicio</Link>
              <Link className="nav-link" to={"category/Relojes"}>Relojes</Link>
              <Link className="nav-link" to={"category/Alianzas"}>Alianzas</Link>
              <Link className="nav-link" to={"category/Joyas"}>Joyas</Link>
            </div>
          </div>
        </div>
        <div className="d-flex align-item-center">
          <Link className="nav-link " to={"/Cart"}>
            <CartWidget />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;