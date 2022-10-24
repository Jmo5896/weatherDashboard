import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

export default function Lightning() {
  const myLight = useRef();
  useFrame(() => {
    if (Math.random() > 0.93 || myLight.current.power > 100) {
      if (myLight.current.power < 100) {
        const x = Math.random() * 400;
        const y = 300 + Math.random() * 200;
        const z = 100 + Math.random() * 100;
        myLight.current.position.set(
          Math.round(Math.random()) > 0 ? x : x * -1,
          Math.round(Math.random()) > 0 ? y : y * -1,
          Math.round(Math.random()) > 0 ? z : z * -1
        );
      }
      myLight.current.power = 50 + Math.random() * 500;
    }
  });
  return (
    <pointLight
      ref={myLight}
      color={0x062d89}
      intensity={30}
      distance={500}
      decay={1.7}
      position={[200, 300, 100]}
    />
  );
}
