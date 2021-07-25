import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box, showImage }) => {
  return (
    <div className="content ma">
      <div className="image-container mt2">
        {showImage === true && (
          <img
            id="inputImage"
            alt="I'm waiting for Url please Insert it!"
            src={imageUrl}
            className="fineImage"
          />
        )}
        {showImage === false && <p className=" f4 tc">"Give it a try!"</p>}
        {box.map((item, index) => (
          <div
            className="bounding-box"
            style={{
              top: item.topRow,
              right: item.rightCol,
              bottom: item.bottomRow,
              left: item.leftCol,
            }}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
