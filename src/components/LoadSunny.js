import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function LoadSunny({
  modelPath,
  scale = 40,
  position = [0, 0, 0],
}) {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  // const [hovered, hover] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.y += 0.003));

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={position}
      // scale={hovered ? scale * 1.2 : scale}
      scale={scale}
      //   onPointerOver={(e) => hover(true)}
      //   onPointerOut={(e) => hover(false)}
    />
  );
}
