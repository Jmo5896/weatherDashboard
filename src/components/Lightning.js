import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";

export default function Lightning() {
  const myLight = useRef();
  useFrame(() => {
    if (Math.random() > 0.93 || myLight.current.power > 100) {
      if (myLight.current.power < 100) {
        myLight.current.position.set(
          Math.random() * 400,
          300 + Math.random() * 200,
          100
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
