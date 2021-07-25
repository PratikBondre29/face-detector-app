import React, { useState } from "react";
import Logo from "../Logo/Logo";
import "./Register.css";

const Register = ({ onRouteChange, loadUser }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");

  //Handling name

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  //Handling email

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };
  //Handling password

  const handlePassInput = (event) => {
    setPass(event.target.value);
  };

  //handling submit register

  const handleRegister = () => {
    fetch("https://vast-beyond-18962.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
          onRouteChange("signin");
        }
      });
  };

  return (
    <div className="main">
      <div className="main-box row">
        <div className="col-10 col-md-4 mx-auto">
          <div className="form-box">
            <div className="form-logo">
              <Logo />
            </div>
            <div className="form1">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleNameInput}
                  className="form-control"
                  id="name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  onChange={handleEmailInput}
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handlePassInput}
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="tc">
                <button
                  // onClick={() => }
                  onClick={handleRegister}
                  type="submit"
                  id="register"
                  className="button"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
