import React, { useState } from "react";

import Storm from "./components/Storm";
import Sunny from "./components/Sunny";
import Toggle from "./components/Toggle";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [background, setBackground] = useState("storm");

  return (
    <div style={{ height: "100vh" }} className="App">
      <Toggle switchBackground={setBackground} />
      {background === "storm" ? <Storm /> : <Sunny />}
    </div>
  );
}

export default App;
