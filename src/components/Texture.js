import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export default function Texture({
  url,
  dimensions,
  position,
  rotation,
  opacity,
  animate,
}) {
  const mapper = useLoader(TextureLoader, url);
  const myMesh = useRef();
  const random = Math.round(Math.random());
  useFrame(() => {
    if (animate) {
      if (random > 0) {
        myMesh.current.rotation.z -= 0.002;
      } else {
        myMesh.current.rotation.z += 0.002;
      }
    }
  });
  return (
    <mesh
      ref={myMesh}
      position={position || [0, 0, 0]}
      rotation={rotation || [0, 0, 0]}
      opacity={opacity || 1.0}
    >
      <planeGeometry args={dimensions || [50, 50]} />
      <meshLambertMaterial map={mapper} transparent />
    </mesh>
  );
}
