import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

// import rainDrop from "../images/rainDrop.png";
import rainDrop from "../images/octo.png";

// rainCount start value 15000
export default function Rain({ rainCount }) {
  const mapper = useLoader(TextureLoader, rainDrop);
  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < rainCount; i++) {
      positions.push(Math.random() * 400 - 200);
      positions.push(Math.random() * 500 - 250);
      positions.push(Math.random() * 400 - 200);
    }

    return new Float32Array(positions);
  }, [rainCount]);
  const myDrops = useRef();

  useFrame(() => {
    const positions = myDrops.current.array;
    // array for updating JUST the y values, 2, 5, 8, 11, etc...
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= 1;
      // resets the drops so they fall in an infinite manor
      if (positions[i] < 0) {
        positions[i - 1] = Math.random() * 400 - 200;
        positions[i] = Math.random() * 500 - 250;
        positions[i + 1] = Math.random() * 400 - 200;
      }
    }
    myDrops.current.needsUpdate = true;
  });
  // console.log(drops);
  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={myDrops}
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        // color={0xaaaaaa}
        map={mapper}
        size={0.5}
        transparent
        opacity={1.5}
      />
    </points>
  );
}
