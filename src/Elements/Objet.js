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

const Objet = (props) => {

    const {
        tex,
    } = props;

    return (
        <>
            <Cone
                position={[0, 0, 0]}
                scale={1.15}
                settings={[4, 1, 100, 1, 'true']}
                color={[20, 0.5, 20]}
                opacity={0.2}
                move={false}
                spin={{
                    dir: true,
                    speed: 0.002
                }}
                wireframe={true}
                tex={tex}
            />
            <BigRing
                position={[0, 0, 0.3]}
                scale={1.5}
                ringScale={[1.4, 0.9, 1]}
                ringPos={3.5}
                settings={[0.5, 1, 32]}
                color={[0, 0, 5]}
                opacity={0.2}
                wireframe={true}
                num={14}
                edges={true}
                tex={tex}
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
            />
            <Circle
                position={[0, 0, 0.1]}
                scale={1}
                settings={[1.3, 32]}
                color={[0, 0, 5]}
                wireframe={false}
                opacity={0.8}
                edges={false}
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
            />
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
            {/* <Disc
                position={[0, 0.15, 0]}
                scale={0.2}
                settings={[2, 1, 64, 2, 3, 3]}
                color={[20, 0.5, 20]}
                move={0.03}
                spin={{
                    dir: true,
                    speed: 0.002
                }}
                wireframe={false}
                tex={tex}
            /> */}
        </>
    );

};

export default Objet;