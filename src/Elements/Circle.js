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

import * as THREE from 'three';

const Circle = (props) => {

    const {
        settings,
        position,
        edges,
        color,
        opacity,
        wireframe,
        move
    } = props;

    const ref = useRef()

    useFrame(({ clock }) => {
        if (ref && ref.current) {
            if (move) {
                ref.current.position.z += (Math.sin(clock.elapsedTime * 2) * move)
                // ref.current.scale.set(ref.current.scale + (Math.sin(clock.elapsedTime + 1) * move));
            };
        };
    });

    return (
        <mesh
            ref={ref}
            position={position}
        >
            <circleGeometry args={settings} />
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
                    threshold={10}
                >
                    <lineBasicMaterial
                        color={color}
                        toneMapped={false}
                    />
                </Edges>
            }
        </mesh>
    );

};

export default Circle;