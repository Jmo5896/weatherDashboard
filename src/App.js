import React from "react";

import { Canvas } from "react-three-fiber";
// import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";

import Lightning from "./components/Lightning";
import Clouds from "./components/Clouds";
import Rain from "./components/Rain";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div style={{ height: "100vh" }} className="App">
      <Canvas
        style={{ backgroundColor: "black" }}
        camera={{
          fov: 60,
        }}
        onCreated={({ camera, gl }) => {
          camera.position.setZ(1);
          camera.rotation.set(1.16, -0.12, 0.27);
          // gl.setClearColor(0x11111f);
          // gl.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <ambientLight color={0x555555} />
        <directionalLight color={0xffeedd} position={[0, 0, 1]} />
        <fogExp2 attach="fog" args={[0x11111f, 0.002]} />
        <Clouds howMany={25} />
        <Lightning />
        <Rain rainCount={15000} />
      </Canvas>
    </div>
  );
}

export default App;
