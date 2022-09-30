import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, extend, useLoader, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PresentationControls, Environment, Effects, Loader, useTexture, Html, CameraShake, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'
import { Blob } from './Elements/Blob'
import { Hair } from './Elements/Hair'
import { Clouds } from './Elements/Clouds'
import Particles from './Elements/Particles'
import Sparks from './Elements/Sparks'
import './Visual.css';

export default function MainVisual(props) {

    const {
        id,
        type,
        value,
        perc1,
        perc2,
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
        a1
    } = props

    const [interacting, setInteracting] = useState(false)
    const [intensity, setIntensity] = useState(50)

    const mouse = useRef([0, 0])
    const lightRef1 = useRef()
    const lightRef2 = useRef()
    const lightRef3 = useRef()
    extend({ LUTPass })

    useEffect(() => {
        console.log('yeyey')
        if (interacting) console.log(lightRef1.current)
    }, interacting)

    return (
        <div
            id="visual"
            style={{
                background: `radial-gradient(circle, rgba(${r2}, ${g2}, ${b2}, 0.8) 15%, transparent 64%)`
            }}
        >
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
                onPointerDown={() => setInteracting(true)}
                onPointerUp={() => setInteracting(false)}
            >
                <spotLight
                    intensity={0.8}
                    angle={0.2}
                    penumbra={1}
                    position={[5, 12, 10]}
                />
                <Suspense
                    fallback={null}
                >
                    <PresentationControls
                        global
                        config={{ mass: 2, tension: 100 }}
                        snap={{ mass: 5, tension: 100 }}
                        rotation={[0, Math.PI / 16, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                    >
                        <Hair>
                            <Blob
                                type={type}
                                color={`rgb(${r1}, ${g1}, ${b1})`}
                            />
                        </Hair>
                    </PresentationControls>
                    {interacting &&
                        <Environment>
                            <Lightformer
                                ref={lightRef1}
                                form={'ring'}
                                intensity={0}
                                rotation-y={Math.PI / 4}
                                position={[1.5, -4.5, 1.5]}
                                scale={[5, 1.5, 1]}
                            />
                            <Lightformer
                                ref={lightRef2}
                                form={'circle'}
                                intensity={0}
                                rotation-y={Math.PI / 4}
                                position={[2.8, -2, 1.5]}
                                scale={[0.4, 0.25, 1]}
                            />
                            <Lightformer
                                ref={lightRef3}
                                form={'circle'}
                                intensity={0}
                                rotation-y={Math.PI / 4}
                                position={[0.5, -1, 1.5]}
                                scale={[0.2, 0.15, 1]}
                                color="white"
                            />
                        </Environment>
                    }
                    <Particles
                        count={value}
                        mouse={mouse}
                        type={type}
                    />
                    <Clouds
                        color={`rgb(${r1}, ${g1}, ${b1})`}
                    />
                    <Effects />
                    {/* <Sparks count={20} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']} /> */}
                    <CameraShake
                        maxRoll={0.08}
                        maxPitch={0.08}
                        maxYaw={0.08}
                    />
                </Suspense>
            </Canvas>
        </div>
    )

}

{/* SAD FACE */ }
{/* <Lightformer
form={'circle'}
intensity={50}
rotation-y={Math.PI / 4}
position={[1.5, 1.5, 1.5]}
scale={[5, 0.1, 1]}
/>
<Lightformer
form={'circle'}
intensity={50}
rotation-y={Math.PI / 4}
position={[2.8, 3.8, 1.5]}
scale={[0.8, 0.25, 1]}
/>
<Lightformer
form={'circle'}
intensity={50}
rotation-y={Math.PI / 4}
position={[0, 2, 1.5]}
scale={[0.3, 0.25, 1]}
/> */}