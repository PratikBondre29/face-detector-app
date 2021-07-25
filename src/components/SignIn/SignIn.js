import React, { useState } from "react";
import "./SignIn.css";
import Logo from "../Logo/Logo";
const SignIn = ({ loadUser, onRouteChange }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //Handling Email

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPassChange = (event) => {
    setPass(event.target.value);
  };
  const onSubmitSignin = () => {
    if (email !== "" && pass !== "") {
      fetch("https://vast-beyond-18962.herokuapp.com/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            loadUser(data);
            onRouteChange("home");
          }
        });
    }
  };
  return (
    <div className="main">
      <div className="main-box row">
        <div className="col-10 col-md-4 col-sm-6 mx-auto">
          <div className="form-box">
            <div className="form-logo">
              <Logo />
            </div>
            <div className="form1">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  onChange={onEmailChange}
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={onPassChange}
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="tc">
                <button
                  onClick={onSubmitSignin}
                  type="submit"
                  id="signin"
                  className="button"
                >
                  Sign In
                </button>
              </div>
              <a
                className="register pointer"
                onClick={() => onRouteChange("register")}
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
