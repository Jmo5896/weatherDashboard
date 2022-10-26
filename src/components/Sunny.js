import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";

import LoadSunny from "./LoadSunny";

export default function Sunny({ modelPath, scale = 40, position = [0, 0, 0] }) {
  return (
    <Canvas
      className="canvas"
      style={{ backgroundColor: "skyblue" }}
      camera={{
        fov: 60,
      }}
      onCreated={({ camera }) => {
        camera.position.setZ(450);
        camera.position.setY(200);
        camera.rotation.set(-0.25, 0, 0);
        // gl.setClearColor(0x11111f);
        // gl.setSize(window.innerWidth, window.innerHeight);
      }}
    >
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <startTransition> */}
      <Suspense fallback={null}>
        <LoadSunny modelPath={modelPath} scale={scale} position={position} />
        {/* <OrbitControls /> */}
      </Suspense>
      {/* </startTransition> */}
    </Canvas>
  );
}
