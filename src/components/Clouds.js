import React from 'react'

import Texture from './Texture'

import cloud from '../images/cloud.png'

export default function Clouds({howMany}) {
    const iterator = [...Array(howMany).keys()]
  return (
    <>
    {iterator.map(i => (
        <Texture
        key={i}
        url={cloud} 
        dimensions={[500,500]}
        position={[Math.random()*800 - 400, 500, Math.random()*500 - 450]}
        rotation={[1.16, -0.12, Math.random()*360]}
        opacity={0.6}
        />
    ))}
    </>
  )
}
