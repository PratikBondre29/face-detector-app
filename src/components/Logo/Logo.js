import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import logo from "./logo.png";

const Logo = () => {
  return (
    <div className="home-logo  ma4 mt0">
      <Tilt
        className="Tilt br4 shadow-2 tc"
        options={{ max: 55 }}
        style={{ height: 90, width: 90 }}
      >
        <div className="Tilt-inner">
          <img style={{ padding: 10 }} src={logo} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
