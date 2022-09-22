import React, { useRef } from 'react'
import { Group, Texture } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Billboard, Plane, useTexture } from '@react-three/drei'

const CLOUD_URL = process.env.PUBLIC_URL + '/textures/cloud/cloud.png'
// const CLOUD_URL = 'https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png'

const Cloud = ({
    opacity = 0.5,
    opacityOffset = 0.5,
    speed = 0.4,
    width = 10,
    depth = 1.5,
    segments = 20,
    texture = CLOUD_URL,
    color = '#ffffff',
    depthTest = true,
    ...props
}) => {
    const gl = useThree((state) => state.gl)
    const group = useRef()
    const cloudTexture = useTexture(texture)
    const clouds = React.useMemo(
        () =>
            [...new Array(segments)].map((_, index) => ({
                x: width / 2 - Math.random() * width,
                y: width / 2 - Math.random() * width,
                scale: 0.4 + Math.sin(((index + 1) / segments) * Math.PI) * ((0.2 + Math.random()) * 10),
                density: Math.max(0.2, Math.random()),
                rotation: Math.max(0.002, 0.005 * Math.random()) * speed,
            })),
        [width, segments, speed]
    )
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        group.current?.children.forEach((cloud, index) => {
            cloud.children[0].rotation.z += clouds[index].rotation
            cloud.children[0].material.opacity = (Math.sin(elapsedTime * opacityOffset) * Math.sin(elapsedTime * opacityOffset)) * opacity
            cloud.children[0].scale.setScalar(
                clouds[index].scale + (((1 + Math.sin(elapsedTime / 10)) / 2) * index) / 10
            )
        })
    }
    )
    return (
        <group {...props}>
            <group position={[0, 0, (segments / 2) * depth]} ref={group}>
                {clouds.map(({ x, y, scale, density }, index) => (
                    <Billboard key={index} position={[x, y, -index * depth]}>
                        <Plane scale={scale} rotation={[0, 0, 0]}>
                            <meshStandardMaterial
                                map={cloudTexture}
                                map-encoding={gl.outputEncoding}
                                transparent
                                opacity={(scale / 6) * density * opacity}
                                depthTest={depthTest}
                                color={color}
                            />
                        </Plane>
                    </Billboard>
                ))}
            </group>
        </group>
    )
}

export const Clouds = () => {
    return (
        <group>
            <Cloud depthTest={false} position={[-10, -6, -10]} speed={0.2} opacity={0.12} opacityOffset={0.4} />
            <Cloud depthTest={false} position={[10, 6, -15]} speed={0.2} opacity={0.25} opacityOffset={0.25} />
            <Cloud depthTest={false} position={[0, 10, 0]} speed={0.2} opacity={0.21} opacityOffset={0.2} />
            <Cloud depthTest={false} position={[0, -10, 0]} speed={0.2} opacity={0.22} opacityOffset={0.2} />
            <Cloud depthTest={false} position={[-10, -6, 15]} speed={0.2} opacity={0.16} opacityOffset={0.3} />
            <Cloud depthTest={false} position={[10, 6, 10]} speed={0.2} opacity={0.28} opacityOffset={0.25} />
        </group>
    )
}