import React from 'react'
import { useLoader } from 'react-three-fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Texture({url, dimensions, position, rotation, opacity}) {
    const mapper = useLoader(TextureLoader, url)
    return (
    <mesh
    position={position}
    rotation={rotation}
    // opacity={opacity}
    >
    <planeGeometry args={dimensions} />
    <meshLambertMaterial 
    map={mapper}
    transparent  
    />
    </mesh>
    )
}
