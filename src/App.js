import React, { useState } from "react";

import Storm from "./components/Storm";
import Sunny from "./components/Sunny";
import Toggle from "./components/Toggle";
import Dashboard from "./components/Dashboard";

import landScape from "./images/landscape.gltf";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const goodbye_world = ["e05ef1e", "6afb7c131"];

function App({ hello_world }) {
  const [background, setBackground] = useState("storm");

  return (
    <div style={{ height: "100vh" }} className="App">
      <Toggle background={background} switchBackground={setBackground} />
      <Dashboard part4={goodbye_world} partA={hello_world} />
      {background === "storm" ? <Storm /> : <Sunny modelPath={landScape} />}
    </div>
  );
}

export default App;
