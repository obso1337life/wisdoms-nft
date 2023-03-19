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
        <group>
            <Cone
                position={[0, 0, 0]}
                scale={1.15}
                settings={[4, 1, 100, 1, 'true']}
                color={[20, 0.5, 20]}
                opacity={0.1}
                move={false}
                spin={{
                    dir: true,
                    speed: 0.002
                }}
                wireframe={true}
                tex={tex}
            />
            {/* <BigRing
                position={[0, 0, 0.3]}
                scale={1.5}
                ringScale={[1.4, 0.9, 1]}
                ringPos={4}
                settings={[0.5, 1, 32]}
                color={[0, 0, 5]}
                opacity={0.2}
                wireframe={false}
                num={14}
                edges={true}
                tex={tex}
                spin={0.0005}
            /> */}
            <Shape
                opacity={0}
                scale={1.1}
                color={[0, 0.5, 0.5]}
                displacementMap={displacementMap}
                normalMap={normalMap}
                edges={true}
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
                edges={true}
                tex={tex}
                spin={null}
            />
            <Circle
                position={[0, 0, 0.1]}
                scale={1}
                settings={[1.3, 32]}
                color={[0, 0, 5]}
                wireframe={false}
                opacity={0}
                edges={false}
                move={false}
            />
            <BigRing
                position={[0, 0, 0.7]}
                scale={0.5}
                ringScale={[1, 1, 1]}
                ringPos={2.5}
                settings={[0.5, 1, 32]}
                color={[0, 0, 0]}
                wireframe={false}
                opacity={1}
                num={14}
                edges={false}
                tex={tex}
                spin={-0.002}
            />
            {/* <Disc
                position={[0, 0, 0.7]}
                scale={0.15}
                settings={[2, 1, 64, 2, 3, 3]}
                color={[20, 0.5, 20]}
                move={0.008}
                spin={{
                    dir: true,
                    speed: 0.002
                }}
                wireframe={false}
                tex={tex}
            /> */}
            {/* <Disc
                position={[0, 0, 1]}
                scale={0.5}
                settings={[3, 1, 64, 2, 3, 3]}
                color={[0, 0, 20]}
                move={0.005}
                spin={{
                    dir: false,
                    speed: 0.005
                }}
                wireframe={true}
                tex={tex}
            /> */}
        </group>
    );

};

export default Objet;