import React from "react";
import { Canvas } from "react-three-fiber";

import Lightning from "./Lightning";
import Clouds from "./Clouds";
import Rain from "./Rain";

export default function Storm() {
  return (
    <Canvas
      className="canvas"
      style={{ backgroundColor: "black" }}
      camera={{
        fov: 60,
      }}
      onCreated={({ camera }) => {
        camera.position.setZ(1);
        camera.rotation.set(1.16, -0.12, 0.27);
        // gl.setClearColor(0x11111f);
        // gl.setSize(window.innerWidth, window.innerHeight);
      }}
    >
      <ambientLight color={0x555555} />
      <directionalLight color={0xffeedd} position={[0, 0, 1]} />
      <fogExp2 attach="fog" args={[0x11111f, 0.002]} />
      {/* <Texture
      url={octo}
      dimensions={[500, 500]}
      position={[0, 500, -100]}
      rotation={[1.16, -0.12, 0.27]}
      opacity={0.6}
      animate={false}
    /> */}
      <Clouds howMany={25} />
      <Lightning />
      <Rain rainCount={15000} />
    </Canvas>
  );
}
