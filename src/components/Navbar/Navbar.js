import React from "react";
import "./Navbar.css";

const Navbar = ({ onRouteChange, clearState }) => {
  return (
    <>
      <nav
        className="navbar"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <p
          onClick={() => onRouteChange("signout")}
          id="signOut"
          className="f3 link dim black pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    </>
  );
};

export default Navbar;
