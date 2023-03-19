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
        color,
        opacity,
        wireframe,
        scale,
        displacementMap,
        normalMap,
        edges
    } = props;

    const ref = useRef();
    const materialRef = useRef();

    const ring = useLoader(OBJLoader, './models/ring.obj');
    const geom = ring.children[0].geometry;

    // useEffect(() => {

    //     const vertex = new THREE.Vector3();
    //     const normal = new THREE.Vector3();
    //     let newPositionAttribute = [];

    //     const positionAttribute = geom.getAttribute('position');
    //     const normalAttribute = geom.getAttribute('normal');

    //     for (let i = 0; i < positionAttribute.count; i++) {
    //         vertex.fromBufferAttribute(positionAttribute, i)
    //         normal.fromBufferAttribute(normalAttribute, i)
    //         const v = vertex.multiplyScalar(0.5)
    //         const n = Perlin.simplex3(...v.toArray())

    //         let nVal = n;
    //         // let nVal = n * (modifiers ? modifiers.nMod : 1);

    //         vertex.add(normal.multiplyScalar(nVal));
    //         newPositionAttribute.push(vertex.x, vertex.y, vertex.z)
    //     };

    //     geom.setAttribute('position', new THREE.Float32BufferAttribute(newPositionAttribute, 3));
    //     geom.attributes.position.needsUpdate = true;
    //     geom.computeVertexNormals();

    // }, []);

    useFrame(({ clock }) => {
        if (materialRef && materialRef.current) {
            materialRef.current.opacity = 0.5 * (1.2 + Math.sin(clock.elapsedTime * 0.5));
            ref.current.rotation.x = ref.current.rotation.x - 0.005;
            // if (move) ref.current.position.z += (Math.sin(clock.elapsedTime * 2) * move);
        };
    });

    return (
        <group
            rotation={[0, Math.PI * 0.5, 0]}
            scale={scale}
        >
            <mesh
                ref={ref}
                geometry={geom}
            >
                <meshPhysicalMaterial
                    // normalMap={normalMap}
                    // displacementMap={displacementMap}
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