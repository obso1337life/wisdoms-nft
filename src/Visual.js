import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, extend, useLoader, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PresentationControls, CameraShake, Environment, Float } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'
import { Blob } from './Elements/Blob'
import { Clouds } from './Elements/Clouds'
import Particles from './Elements/Particles'
import Effects from './Elements/Effects'
import Text from './Elements/Text'
import './Visual.css';

import HDR from "./abstract.hdr";

// rotation and scale values for different objects
const defaults = {
    icosahedron: {
        rotation: [0, 0, 0],
        scale: [0.8, 0.8, 0.8]
    },
    torusKnot: {
        rotation: [0, 0, 0],
        scale: [0.3, 0.3, 0.3]
    }
};

const textures = [
    '01',
    '02',
    '02a',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15'
];

export default function MainVisual(props) {
    const {
        id,
        value,
        name,
        perc1,
        perc2,
        perc3,
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
        a1,
        modifiers,
        baseModifiers
    } = props;

    let tex = textures[Math.floor(textures.length * (perc3 / 100))];
    if (!modifiers) return null;

    return (
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
            <Suspense
                fallback={null}
            >
                <Float
                    speed={baseModifiers.float_speed * (modifiers ? modifiers.fsMod : 1)}
                    rotationIntensity={baseModifiers.float_rotation_intensity * (modifiers ? modifiers.friMod : 1)}
                    floatIntensity={baseModifiers.float_intensity * (modifiers ? modifiers.fiMod : 1)}
                    floatingRange={[baseModifiers.float_range_start * (modifiers ? modifiers.frMod : 1), baseModifiers.float_range_end * (modifiers ? modifiers.frMod : 1)]}
                >
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
                                tex={tex}
                                color={`rgb(${r1}, ${g1}, ${b1})`}
                                modifiers={modifiers}
                                baseModifiers={baseModifiers}
                            />
                        </PresentationControls>
                    </group>
                </Float>
                <Particles
                    count={value * 10}
                    color1={`rgb(${r1}, ${g1}, ${b1})`}
                    color2={`rgb(${r2}, ${g2}, ${b2})`}
                    particleSpeed={baseModifiers.particle_speed * (modifiers ? modifiers.psMod : 1)}
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
    )

};