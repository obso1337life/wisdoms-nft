import React, { useEffect, useRef, forwardRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { ComputedAttribute, Html, Sampler } from '@react-three/drei'

import Perlin from 'perlin.js'

export const Blob = (props, ref) => {
    Perlin.seed(Math.random());

    const {
        object,
        type,
        color,
        defaultX,
        material
    } = props;

    console.log(object);

    const blobRef = useRef();
    const meshRef = useRef(null);

    useEffect(() => {
        const geom = object.type === 'custom' ? object.obj.children[0].geometry : object;

        if (object.type === 'custom') object.obj.children[0].material = material;

        const vertex = new THREE.Vector3();
        const normal = new THREE.Vector3();
        let newPositionAttribute = [];

        const positionAttribute = geom.getAttribute('position');
        const normalAttribute = geom.getAttribute('normal');

        console.log('looping with noise');

        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i)
            normal.fromBufferAttribute(normalAttribute, i)
            const v = vertex.multiplyScalar(0.9)
            const n = Perlin.simplex3(...v.toArray())

            vertex.add(normal.multiplyScalar(n * 0.5))
            newPositionAttribute.push(vertex.x, vertex.y, vertex.z)
        };

        geom.setAttribute('position', new THREE.Float32BufferAttribute(newPositionAttribute, 3));
        geom.attributes.position.needsUpdate = true;
        geom.computeVertexNormals();

        return () => {
            console.log('unmount');
        };
    }, []);

    // USE THIS FOR SCALING WITH VALUE
    useFrame(({ clock }) => {
        // console.log('clock', clock);
        const elapsedTime = clock.getElapsedTime();
        let scale = 0.8 + ((Math.sin(elapsedTime * 0.1) * Math.sin(elapsedTime * 0.1)) * 0.3);
        blobRef.current.scale.set(scale, scale, scale);
    });

    return (
        <group
            ref={blobRef}
        >
            <mesh
                geometry={object}
                material={material}
                rotation={defaultX.rotation}
                scale={defaultX.scale}
            />
        </group>
    );

}
