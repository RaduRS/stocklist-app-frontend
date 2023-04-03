import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/stocklist-logo.jpg";
import "./Home.scss";
import heroImage from "../../assets/inv-img2.jpg";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../components/protect/HiddenLinks";

const Home = () => {
  return (
    <div className="home">
      <nav className="--flex-between top-nav">
        <div className="logo">
          <img src={logo} alt="stocklist-logo"></img>
        </div>
        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <Link className="--btn --btn-primary" to="/login">
                Login
              </Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <Link className="--btn --btn-primary" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      <div className="hero">
        <div className="hero-text">
          <h1 className="title">Inventory & Stock Management</h1>
          <p className="statement">
            Our cutting-edge solution offers real-time insights, automatic
            alerts, and easy reporting. Keep your supply chain running smoothly
            with accurate stock levels and improved efficiency!
          </p>

          <div className="hero-buttons">
            <ShowOnLogout>
              <button className="--btn --btn-primary hp-button">
                <Link to="/register">Try Now for FREE</Link>
              </button>
            </ShowOnLogout>
            <ShowOnLogin></ShowOnLogin>
          </div>
          <div className="big-number">
            <NumberText num="12k" text="Brand Owners" />
            <NumberText num="27k" text="Active Users" />
            <NumberText num="800+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Inventory" />
        </div>
      </div>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div>
      <h3 className="--color-white home-numbers">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
