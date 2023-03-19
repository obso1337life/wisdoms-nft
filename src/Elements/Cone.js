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

import {
    OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader';

import * as THREE from 'three';

const Cone = (props) => {

    const {
        position,
        settings,
        scale,
        wireframe,
        color,
        tex,
        opacity,
        edges
    } = props;

    const materialRef = useRef();

    const cone = useLoader(OBJLoader, './models/cone.obj');
    const geom = cone.children[0].geometry;

    return (
        <group
            position={position}
            rotation={[Math.PI * 0.5, 0, 0]}
            scale={scale}
        >
            <mesh
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
                        scale={1}
                        threshold={50}
                    >
                        <lineBasicMaterial
                            ref={materialRef}
                            color={color}
                            toneMapped={false}
                            transparent
                            opacity={0.1}
                        />
                    </Edges>
                }
            </mesh>
        </group>
        // <mesh
        //     rotation={[Math.PI * -0.5, 0, 0]}
        //     scale={scale}
        // >
        //     <coneGeometry args={settings} />
        //     <meshPhysicalMaterial
        //         color={color}
        //         transparent
        //         opacity={opacity}
        //         wireframe={wireframe}
        //         side={THREE.DoubleSide}
        //     />
        //     <Edges
        //         scale={0.95}
        //         threshold={10}
        //     >
        //         <lineBasicMaterial
        //             color={color}
        //             toneMapped={false}
        //         />
        //     </Edges>
        // </mesh>
    );

};

export default Cone;