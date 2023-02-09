import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, extend, useLoader, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PresentationControls, CameraShake, Environment, useTexture } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
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
    } = props;

    const mouse = useRef([0, 0]);

    const Object = () => {

        const objects = {
            icosahedron: new THREE.IcosahedronGeometry(1.9, 128),
            torusKnot:  new THREE.TorusKnotGeometry( 5, 0.05, 600, 66, 2, 2 )
        };
    
        // texture
        const texture = useTexture(`./textures/blob/${type}/${type}.jpg`);
    
        // displacement and normal maps
        let dmUrl = `./textures/blob/${type}/DisplacementMap.png`;
        let nmUrl = `./textures/blob/${type}/NormalMap.png`;
    
        const [
            displacementMap,
            normalMap
        ] = useLoader(TextureLoader, [
            dmUrl,
            nmUrl
        ]);
    
        // material
        let blobMaterial = new THREE.MeshPhysicalMaterial({
            normalMap: normalMap,
            displacementMap: displacementMap,
            envMapIntensity: 4,
            map: texture,
            clearcoat: 40,
            clearcoatRoughness: 0,
            roughness: 0,
            metalness: 0,
        });

        return (
            <Blob
                key={object && type}
                material={blobMaterial}
                object={object && !!objects[object] ? objects[object] : null}
                defaultX={object && !!defaults[object] ? defaults[object] : null}
                type={type}
                color={`rgb(${r1}, ${g1}, ${b1})`}
            />
        );

    };

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
                {object &&
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
                            <Object />
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
    )

};