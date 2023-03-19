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

import BigRing from './BigRing';

import Cone from './Cone';

import Disc from './Disc';

import Circle from './Circle';

import Shape from './Shape';

const Objet = (props) => {

    const {
        tex,
    } = props;

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

    return (
        <group
            position={[0, 0, 0]}
        >
            <Cone
                position={[0, 0, -1.2]}
                scale={0.41}
                settings={[4, 1, 100, 1, 'true']}
                color={[5, 5, 0]}
                opacity={0.2}
                move={false}
                wireframe={false}
                tex={tex}
                edges={true}
            />
            <Shape
                position={[0, 0, 0.5]}
                opacity={0}
                opacityAnimBase={1.4}
                opacityAnimSpeed={0.5}
                scale={1.1}
                color={[0.2, 1, 0.1]}
                displacementMap={displacementMap}
                normalMap={normalMap}
                edges={true}
                spin={0.005}
            />
            <BigRing
                position={[0, 0, 0.4]}
                scale={0.8}
                ringScale={[1.4, 0.9, 1]}
                ringPos={2.5}
                settings={[0.1, 1, 32]}
                color={[10, 0, 0]}
                wireframe={false}
                opacity={0.6}
                num={8}
                edges={false}
                tex={tex}
                spin={null}
            />
            <Shape
                position={[0, 0, -1.5]}
                opacity={0}
                opacityAnimBase={1.05}
                opacityAnimSpeed={0.3}
                scale={0.2}
                color={[0.5, 0, 0.2]}
                displacementMap={displacementMap}
                normalMap={normalMap}
                edges={true}
                spin={-0.002}
            />
            {/* <Circle
                position={[0, 0, 0.1]}
                scale={1}
                settings={[1.3, 32]}
                color={[0, 0, 5]}
                wireframe={false}
                opacity={0}
                edges={false}
                move={false}
            /> */}
            {/* <BigRing
                position={[0, 0, 0.7]}
                scale={0.5}
                ringScale={[1, 1, 1]}
                ringPos={2.5}
                settings={[0.5, 1, 32]}
                color={[1.5, 0, 0.45]}
                wireframe={false}
                opacity={1}
                num={14}
                edges={false}
                tex={tex}
                spin={-0.002}
            /> */}
        </group>
    );

};

export default Objet;