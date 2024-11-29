import { useLoader } from '@react-three/fiber'
import React from 'react'
import { TextureLoader } from 'three'

export default function Background(props) {
    const texture = useLoader(TextureLoader, './smoke.png');

    return (
        <>
            <mesh>
                <planeGeometry />
                <meshStandardMaterial map={texture} transparent={true} />
            </mesh>
        </>
    )

}
