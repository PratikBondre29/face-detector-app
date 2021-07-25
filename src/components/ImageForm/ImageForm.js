import React from "react";
import "./ImageForm.css";

const ImageForm = ({ handleInput, handleSubmit }) => {
  return (
    <div>
      <p className="f3 tc">
        {"This face detector detects faces in your picture"}
      </p>
      <div className="row">
        <div className="form col-10 col-md-5 mx-auto pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 br3"
            type="text"
            onChange={handleInput}
          />
          <button
            className="grow w-30 f4 link ph3 br3 pv2 dib white bg-light-purple pointer"
            onClick={handleSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
