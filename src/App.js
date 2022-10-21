import React, { useEffect } from "react";

import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";

import Box from "./components/Box";
import Clouds from "./components/Clouds";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function SceneCamera() {
  const { camera } = useThree();
  useEffect(() => {
    camera.fov = 60;
    camera.near = 1;
    camera.far = 1000;
    // camera.position.set([0, 0, 1]);
    // camera.position.setZ(1);
    // camera.position.setX(2);
    // camera.rotateX(1.16)
    camera.updateProjectionMatrix();
  }, []);

  return <PerspectiveCamera makeDefault></PerspectiveCamera>;
}

function App() {
  return (
    <div style={{ height: "100vh" }} className="App">
      <Canvas
        style={{ backgroundColor: "black" }}
        camera={{
          fov: 60,
          position: [0, 0, 1],
          rotateX: 1.16,
          // rotation: [1.16, -0.12, 0.27]
        }}
      >
        {/* <SceneCamera /> */}
        <ambientLight
          // intensity={0.1}
          color={0x555555}
        />
        <directionalLight color={0xffeedd} position={[0, 0, 1]} />
        <OrbitControls />
        <fogExp2
          // color={0x11111f}
          color="white"
          density={1}
        />
        {/* <Texture url={cloud} dimensions={[500,500]} /> */}
        <Clouds howMany={25} />
        <Stars />
        <Box />
      </Canvas>
    </div>
  );
}

export default App;
