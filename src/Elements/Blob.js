import React, { useEffect, useRef, forwardRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { ComputedAttribute, Html, Sampler, useTexture } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import Perlin from 'perlin.js';
import * as THREE from 'three';

export const Blob = (props, ref) => {
    Perlin.seed(Math.random());

    const {
        tex,
        color,
        modifiers,
        baseModifiers
    } = props;

    const blobRef = useRef();
    const meshRef = useRef(null);

    // object
    const ring = useLoader(OBJLoader, './models/ring.obj');

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

    // material
    let blobMaterial = new THREE.MeshPhysicalMaterial({
        normalMap: normalMap,
        displacementMap: displacementMap,
        envMapIntensity: 0.4,
        map: texture,
        clearcoat: 2,
        clearcoatRoughness: 0,
        roughness: 0,
        metalness: 0.2,
        transparent: true,
        opacity: 0.7
    });

    ring.children[0].material = blobMaterial;

    useEffect(() => {
        // const geom = ring.children[0].geometry;

        // const vertex = new THREE.Vector3();
        // const normal = new THREE.Vector3();
        // let newPositionAttribute = [];

        // const positionAttribute = geom.getAttribute('position');
        // const normalAttribute = geom.getAttribute('normal');

        // for (let i = 0; i < positionAttribute.count; i++) {
        //     vertex.fromBufferAttribute(positionAttribute, i)
        //     normal.fromBufferAttribute(normalAttribute, i)
        //     const v = vertex.multiplyScalar(0.5)
        //     const n = Perlin.simplex3(...v.toArray())

        //     let nVal = n * (modifiers ? modifiers.nMod : 1);

        //     vertex.add(normal.multiplyScalar(nVal));
        //     newPositionAttribute.push(vertex.x, vertex.y, vertex.z)
        // };

        // geom.setAttribute('position', new THREE.Float32BufferAttribute(newPositionAttribute, 3));
        // geom.attributes.position.needsUpdate = true;
        // geom.computeVertexNormals();
    }, []);

    // USE THIS FOR SCALING WITH VALUE
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        
        let scale = 0.3 + (baseModifiers.scale * modifiers.sMod) + ((Math.sin(elapsedTime * (baseModifiers.scale_speed * modifiers.soMod)) * Math.sin(elapsedTime * (baseModifiers.scale_speed * modifiers.soMod))) * (baseModifiers.scale_offset * modifiers.ssMod));

        blobRef.current.scale.set(scale, scale, scale);
    });

    return (
        <group
            ref={blobRef}
        >
            <primitive
                object={ring}
                rotation={[0, Math.PI * 0.5, 0]}
                // rotation={[0, Math.PI * modifiers.ryMod, 0]}
            />
        </group>
    );

}
