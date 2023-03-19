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
    TextureLoader
} from 'three/src/loaders/TextureLoader';

const Disc = (props) => {

    const {
        scale,
        position,
        settings,
        color,
        move,
        spin,
        wireframe,
        tex
    } = props;

    const ref = useRef();

    // texture
    const texture = useTexture(`./textures/blob/${tex}/${tex}.jpg`);

    // displacement and normal maps
    let dmUrl = `./textures/blob/${tex}/DisplacementMap.png`;
    let nmUrl = `./textures/blob/${tex}/NormalMap.png`;

    const [
        displacementMap,
        normalMap
    ] = useLoader(TextureLoader, [
        dmUrl,
        nmUrl
    ]);

    useFrame(({ clock }) => {
        if (ref && ref.current) {
            ref.current.rotation.z = spin.dir ? ref.current.rotation.z + spin.speed : ref.current.rotation.z - spin.speed;
            if (move) ref.current.position.z += (Math.sin(clock.elapsedTime * 2) * move);
        };
    });

    return (
        <mesh
            ref={ref}
            scale={scale}
            position={position}
        >
            <torusKnotGeometry
                args={settings}
            />
            <meshPhysicalMaterial
                normalMap={normalMap}
                // displacementMap={displacementMap}
                map={texture}
                color={'aqua'}
                transparent
                opacity={wireframe ? 0.5 : 0}
                wireframe={wireframe}
            />
            <Edges
                scale={0.95}
                threshold={10}
            >
                <lineBasicMaterial
                    color={color}
                    toneMapped={false}
                />
            </Edges>
        </mesh>
    );

};

export default Disc;