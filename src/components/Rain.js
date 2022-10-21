import { Points } from "@react-three/drei";
import React from "react";
// rainCount start value 15000

export default function Rain({ rainCount }) {
  //   console.log(rainCount);
  const iterator = [...Array(rainCount).keys()];

  return (
    <Points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          //   count={rainCount}
          //   array={iterator.map(
          //     (i) =>
          //       new Float32Array([
          //         Math.random() * 400 - 200,
          //         Math.random() * 500 - 250,
          //         Math.random() * 400 - 200,
          //       ])
          //   )}
        />
      </bufferGeometry>
      <pointsMaterial color={0xaaaaaa} size={0.1} transparent />
    </Points>
  );
}
