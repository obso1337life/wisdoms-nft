import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, extend, useLoader, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PresentationControls, CameraShake, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Blob } from './Elements/Blob'
import { Clouds } from './Elements/Clouds'
import Particles from './Elements/Particles'
import Effects from './Elements/Effects'
import Text from './Elements/Text'
import './Visual.css';

import HDR from "./abstract.hdr";
console.log('>>>', HDR);

export default function MainVisual(props) {

    const {
        id,
        type,
        value,
        name,
        object,
        perc1,
        perc2,
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
        a1,
        modifiers,
        baseModifiers
    } = props

    const [showBlob, setShowBlob] = useState(true);
    const [interacting, setInteracting] = useState(false);
    const [intensity, setIntensity] = useState(0);

    const mouse = useRef([0, 0]);

    useEffect(() => {
        setShowBlob(false);
    }, [type]);

    useEffect(() => {
        if (!showBlob) setTimeout(() => setShowBlob(true), 1000);
    }, [showBlob]);

    return (
        <div
            id="visual"
            style={{
                background: `radial-gradient(circle, rgba(${r2}, ${g2}, ${b2}, 0.8) 15%, transparent 64%)`
            }}
        // onPointerDown={() => handleInteraction('down')}
        // onPointerUp={() => handleInteraction('up')}
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
                    position={[5, 12, 10]}
                />
                {/* <ambientLight /> */}
                <Suspense
                    fallback={null}
                >
                    {object && showBlob &&
                        <group
                            position={[0, 0, -2]}
                        >
                            <PresentationControls
                                global
                                config={{ mass: 2, tension: 100 }}
                                snap={{ mass: 5, tension: 100 }}
                                rotation={[0, Math.PI / 16, 0]}
                                polar={[-Math.PI / 4, Math.PI / 4]}
                                azimuth={[-Math.PI / 4, Math.PI / 4]}
                            >
                                <Blob
                                    key={object && type}
                                    object={object}
                                    type={type}
                                    color={`rgb(${r1}, ${g1}, ${b1})`}
                                    showBlob={showBlob}
                                />
                            </PresentationControls>
                        </group>
                    }
                    <Particles
                        count={value * 10}
                        mouse={mouse}
                        type={type}
                        color1={`rgb(${r1}, ${g1}, ${b1})`}
                        color2={`rgb(${r2}, ${g2}, ${b2})`}
                    />
                    <Clouds
                        color={`rgb(${r1}, ${g1}, ${b1})`}
                    />
                    <Effects />
                    <Text
                        name={name}
                    />
                    <CameraShake
                        maxRoll={0.08}
                        maxPitch={0.08}
                        maxYaw={0.08}
                    />
                    <Environment files="./hdr/abstract.hdr" blur={0.5} />
                </Suspense>
            </Canvas>
        </div>
    )

};