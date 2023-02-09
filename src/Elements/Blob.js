import React, { useEffect, useRef, forwardRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { ComputedAttribute, useTexture, Html, Sampler } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Perlin from 'perlin.js'

Perlin.seed(Math.random());

export const Blob = forwardRef((props, ref) => {

    const {
        object,
        type,
        color,
        showBlob
    } = props;

    const blobRef = useRef();
    const meshRef = useRef(null);

    const objects = {
        cone: {
            obj: useLoader(OBJLoader, './models/cone.obj'),
            // obj: useLoader(OBJLoader, 'https://wisdoms-nft.s3.amazonaws.com/models/cone.obj'),
            type: 'custom'
        },
        ring: {
            obj: useLoader(OBJLoader, './models/ring.obj'),
            // obj: useLoader(OBJLoader, 'https://wisdoms-nft.s3.amazonaws.com/models/ring.obj'),
            type: 'custom'
        },
        icosahedron: {
            obj: new THREE.IcosahedronGeometry(1.9, 128),
            type: 'default'
        }
    };

    // rotation and scale values for different objects
    const defaults = {
        cone: {
            rotation: [Math.PI * 0.25, 0, 0],
            scale: [0.35, 0.35, 0.35]
        },
        ring: {
            rotation: [0, Math.PI * 0.25, 0],
            scale: [0.8, 0.8, 0.8]
        },
        icosahedron: {
            rotation: [0, 0, 0],
            scale: [0.8, 0.8, 0.8]
        }
    };

    // texture
    const texture = useTexture(process.env.PUBLIC_URL + `/textures/blob/${type}/${type}.jpg`);
    // const texture = useTexture(`https://wisdoms-nft.s3.amazonaws.com/textures/blob/${type}/${type}.jpg`);

    // displacement and normal maps
    // let dmUrl = `https://wisdoms-nft.s3.amazonaws.com/textures/blob/${type}/DisplacementMap.png`;
    // let nmUrl = `https://wisdoms-nft.s3.amazonaws.com/textures/blob/${type}/NormalMap.png`;
    let dmUrl = process.env.PUBLIC_URL + `/textures/blob/${type}/DisplacementMap.png`;
    let nmUrl = process.env.PUBLIC_URL + `/textures/blob/${type}/NormalMap.png`;
    const [
        displacementMap,
        normalMap
    ] = useLoader(TextureLoader, [
        dmUrl,
        nmUrl
    ]);

    // material
    const material = new THREE.MeshPhysicalMaterial({
        normalMap: normalMap,
        displacementMap: displacementMap,
        envMapIntensity: 0.4,
        map: texture,
        clearcoat: 0.8,
        clearcoatRoughness: 0,
        roughness: 1,
        metalness: 0,
    });

    
    useEffect(() => {
        if (!showBlob) return;
        console.log('mount');
        const geom = objects[object].type === 'custom' ? objects[object].obj.children[0].geometry : objects[object].obj;
        if (objects[object].type === 'custom') objects[object].obj.children[0].material = material;
        console.log('geom', geom);
        const vertex = new THREE.Vector3();
        const normal = new THREE.Vector3();
        let newPositionAttribute = [];
        const positionAttribute = geom.getAttribute('position');
        const normalAttribute = geom.getAttribute('normal');
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i)
            normal.fromBufferAttribute(normalAttribute, i)
            const v = vertex.multiplyScalar(0.5)
            const n = Perlin.simplex3(...v.toArray())
            vertex.add(normal.multiplyScalar(n * 0.05))
            newPositionAttribute.push(vertex.x, vertex.y, vertex.z)
        };
        geom.setAttribute('position', new THREE.Float32BufferAttribute(newPositionAttribute, 3));
        geom.attributes.position.needsUpdate = true;
        geom.computeVertexNormals();

        return () => {
            console.log('unmount');
        };

    }, [showBlob]);

    // USE THIS FOR SCALING WITH VALUE
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        let scale = 0.8 + ((Math.sin(elapsedTime * 0.1) * Math.sin(elapsedTime * 0.1)) * 0.3);
        blobRef.current.scale.set(scale, scale, scale);
    });

    return (
        <group
            ref={blobRef}
        >
            {objects[object].type === 'custom' &&
                <primitive
                    object={objects[object].obj}
                    rotation={defaults[object].rotation}
                    scale={defaults[object].scale}
                />
            }
            {objects[object].type === 'default' &&
                <mesh
                    geometry={objects[object].obj}
                    material={material}
                    rotation={defaults[object].rotation}
                    scale={defaults[object].scale}
                />
            }
        </group>
    );

})
