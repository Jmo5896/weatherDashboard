import React from "react";
// rainCount start value 15000

export default function Rain({ rainCount }) {
  //   console.log(rainCount);
  const drops = new Float32Array(
    [...Array(rainCount * 3).keys()].map((i) => {
      if (i % 2 === 0) {
        return Math.random() * 500 - 250;
      }
      return Math.random() * 400 - 200;
    })
  );
  // console.log(drops);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={drops.length / 3}
          array={drops}
          itemSize={3}
          // usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color={0xaaaaaa}
        size={0.1}
        transparent
      />
    </points>
  );
}
