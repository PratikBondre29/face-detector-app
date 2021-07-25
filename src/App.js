import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Logo/Logo";
import ImageForm from "./components/ImageForm/ImageForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Splash from "./components/splash/Splash";
import People from "./components/People/People";
import { API } from "./config";

const app = new Clarifai.App({
  apiKey: API,
});

const particlesOption = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};
const App = () => {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [box, setBox] = useState([]);
  const [page, setPage] = useState("splash");
  const [people, setPeople] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [user, setUser] = useState([
    {
      id: "",
      name: "",
      email: "",
      entries: "",
      joined: "",
    },
  ]);

  //Loading Splash Screen
  useEffect(() => {
    setTimeout(() => {
      setPage("signin");
    }, 6000);
  }, []);

  //Loading USer
  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  //Handle Bounding Box
  const calculateFaceLocation = (data, i) => {
    const regionData = data.outputs[0].data.regions[i].region_info.bounding_box;

    const image = document.getElementById("inputImage");
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: regionData.left_col * width,
      topRow: regionData.top_row * height,
      rightCol: width - regionData.right_col * width,
      bottomRow: height - regionData.bottom_row * height,
    };
  };
  // Handle FaceBox

  const FaceBox = (facebox) => {
    const arrayData = box.push(facebox);
    setBox([...box, arrayData]);
  };

  //Handling Input
  const handleInput = (event) => {
    setInput(event.target.value);
  };

  //Handling Submit
  const handleSubmit = () => {
    setUrl(input);
    setShowImage(true);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => {
        if (response) {
          fetch("https://vast-beyond-18962.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              // let newArr = [...user];
              // newArr[0][entries] = count.entries;
              // setUser([...user], newArr);
              setUser({
                id: count.id,
                name: count.name,
                email: count.email,
                entries: count.entries,
                joined: count.joined,
              });
              console.log(count);
            });
        }
        const noPeople = response.outputs[0].data.regions.length;
        setPeople(noPeople);
        for (let i = 0; i < response.outputs[0].data.regions.length; i++) {
          FaceBox(calculateFaceLocation(response, i));
        }
      })
      .catch((err) => console.log(err));
  };
  //initialState
  // const initialState = () => {
  //   return (
  //     user({
  //       id: "",
  //       name: "",
  //       email: "",
  //       entries: "",
  //       joined: "",
  //     }),
  //     url(""),
  //     showImage(false),
  //     box([])
  //   );
  // };
  // Route Change
  const onRouteChange = (route) => {
    if (route === "signout") {
      setPage("signin");
    } else {
      setPage(route);
    }
  };

  // const clearState = () => {
  // setUser({
  //   id: "",
  //   name: "",
  //   email: "",
  //   entries: "",
  //   joined: "",
  // });
  //   setTimeout(() => {
  //     console.log(user);
  //   }, 2000);
  //   setUrl("");
  // };

  return (
    <>
      <div className="App">
        {page === "splash" ? (
          <Splash />
        ) : (
          <div>
            <Particles className="particles" params={particlesOption} />
            {page === "home" ? (
              <div>
                <Navbar onRouteChange={onRouteChange} />
                <Logo />
                <Rank name={user.name} entries={user.entries} />
                <ImageForm
                  handleInput={handleInput}
                  handleSubmit={handleSubmit}
                />
                <People people={people} />
                <FaceRecognition
                  box={box}
                  imageUrl={url}
                  people={people}
                  showImage={showImage}
                />
              </div>
            ) : page === "signin" ? (
              <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
            ) : (
              <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
