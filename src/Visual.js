import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, extend, useLoader, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PresentationControls, Environment, Effects, Loader, useTexture, Html, CameraShake, Float } from '@react-three/drei'
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
        value
    } = props

    const mouse = useRef([0, 0])

    extend({ LUTPass })

    return (
        <div
            id="visual"
            style={{
                // background: `radial-gradient(ellipse at ${perc1}% ${perc2}%, rgba(${r1}, ${g1}, ${b1}, ${a1}), transparent), radial-gradient(ellipse at ${perc3}% ${perc4}%, rgb(${r2}, ${g2}, ${b2}))`
                // background: 'radial-gradient(circle, rgba(121, 9, 63, 0.8) 15%, rgba(0, 212, 255, 0) 64%)'
            }}
        >
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <spotLight
                    intensity={0.8}
                    angle={0.2}
                    penumbra={1}
                    position={[5, 15, 10]}
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
                        azimuth={[-Math.PI / 4, Math.PI / 4]}>
                        <Hair>
                            <Blob
                                type={type}
                            />
                        </Hair>
                    </PresentationControls>
                    <Environment
                        preset="warehouse"
                    />
                    <Particles
                        count={value}
                        mouse={mouse}
                        type={type}
                    />
                    <Clouds />
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