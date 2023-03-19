import React,
{
    useEffect,
    useRef,
} from 'react';

import {
    useFrame,
    useLoader
} from '@react-three/fiber';

import {
    useTexture,
    Edges
} from '@react-three/drei';

import {
    OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader';

import Perlin from 'perlin.js';

import * as THREE from 'three';

const Shape = (props) => {

    const {
        position,
        color,
        opacity,
        opacityAnimBase,
        opacityAnimSpeed,
        wireframe,
        scale,
        displacementMap,
        normalMap,
        edges,
        spin
    } = props;

    const ref = useRef();
    const materialRef = useRef();

    const ring = useLoader(OBJLoader, './models/ring.obj');
    const geom = ring.children[0].geometry;

    useFrame(({ clock }) => {
        if (materialRef && materialRef.current) {
            materialRef.current.opacity = 0.5 * (opacityAnimBase + Math.sin(clock.elapsedTime * opacityAnimSpeed));
            ref.current.rotation.x = ref.current.rotation.x + spin;
            // if (move) ref.current.position.z += (Math.sin(clock.elapsedTime * 2) * move);
        };
    });

    return (
        <group
            position={position}
            rotation={[0, Math.PI * 0.5, 0]}
            scale={scale}
        >
            <mesh
                ref={ref}
                geometry={geom}
            >
                <meshPhysicalMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    wireframe={wireframe}
                    side={THREE.DoubleSide}
                />
                {edges &&
                    <Edges
                        scale={0.95}
                        threshold={50}
                    >
                        <lineBasicMaterial
                            ref={materialRef}
                            color={color}
                            toneMapped={false}
                            transparent
                        />
                    </Edges>
                }
            </mesh>
        </group>
    )

};

export default Shape;