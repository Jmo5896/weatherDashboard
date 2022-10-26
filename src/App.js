import React, { useState } from "react";

import Storm from "./components/Storm";
import Sunny from "./components/Sunny";
import Toggle from "./components/Toggle";

import landScape from "./images/landscape.gltf";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [background, setBackground] = useState("storm");
  console.log(process.env);
  return (
    <div style={{ height: "100vh" }} className="App">
      <Toggle background={background} switchBackground={setBackground} />
      {background === "storm" ? <Storm /> : <Sunny modelPath={landScape} />}
    </div>
  );
}

export default App;
