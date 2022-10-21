import React from 'react'

export default function Box() {
    return (
        <mesh position={[-2,0,-3]}>
          <boxGeometry attach='geometry'/>
          <meshLambertMaterial attach='material' color='white' />
        </mesh>
      )
}
