import React from "react";
import "./People.css";

const People = ({ people }) => {
  return (
    <div>
      {people === 0 ? (
        ""
      ) : people === 1 ? (
        <div className="peoples">
          <span>{people}</span> face found in this picture.
        </div>
      ) : (
        <div className="peoples">
          <span>{people}</span> faces found in this picture.
        </div>
      )}
    </div>
  );
};

export default People;
