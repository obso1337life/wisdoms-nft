import React, { useEffect, useRef, forwardRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { ComputedAttribute, useTexture, Html, Sampler } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import Perlin from 'perlin.js'
import { Bush } from './Bush'

Perlin.seed(Math.random())

const computeFlowerDensity = (geometry) => {
    const position = geometry.getAttribute('position')
    const density = []
    const vertex = new THREE.Vector3()
    for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i)
        const p = vertex.clone().multiplyScalar(1)
        const n = Perlin.simplex3(...p.toArray())
        let m = THREE.MathUtils.mapLinear(n, -1, 1, 0, 1)
        if (m > 0.15) m = 0
        density.push(m)
    }
    return new THREE.Float32BufferAttribute(density, 1)
}

const transform = ({ position, normal, dummy: object }) => {
    object.scale.setScalar(Math.random() * 0.0075)
    object.position.copy(position)
    object.lookAt(normal.add(position))
    object.rotation.y += Math.random() - 0.5 * (Math.PI * 0.5)
    object.rotation.x += Math.random() - 0.5 * (Math.PI * 0.5)
    object.rotation.z += Math.random() - 0.5 * (Math.PI * 0.5)
    object.updateMatrix()
    return object
}

export const Blob = forwardRef((props, ref) => {

    const {
        type
    } = props

    const geom = useRef()
    const blobRef = useRef()
    const meshRef = useRef(null)
    const texture = useTexture(process.env.PUBLIC_URL + `/textures/blob/${type}/${type}.jpg`)

    let dmUrl = process.env.PUBLIC_URL + `/textures/blob/${type}/displacementMap.png`
    let nmUrl = process.env.PUBLIC_URL + `/textures/blob/${type}/NormalMap.png`
    const [
        displacementMap, 
        normalMap
    ] = useLoader(TextureLoader, [
        dmUrl,
        nmUrl
    ])

    useEffect(() => {
        const vertex = new THREE.Vector3()
        const normal = new THREE.Vector3()
        let newPositionAttribute = []
        const positionAttribute = geom.current.getAttribute('position')
        const normalAttribute = geom.current.getAttribute('normal')
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i)
            normal.fromBufferAttribute(normalAttribute, i)
            const v = vertex.multiplyScalar(0.5)
            const n = Perlin.simplex3(...v.toArray())
            vertex.add(normal.multiplyScalar(n * 0.05))
            newPositionAttribute.push(vertex.x, vertex.y, vertex.z)
        }
        geom.current.setAttribute('position', new THREE.Float32BufferAttribute(newPositionAttribute, 3))
        geom.current.attributes.position.needsUpdate = true
        geom.current.computeVertexNormals()
    }, [])

    // USE THIS FOR SCALING WITH VALUE
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()
        let scale = 0.8 + ((Math.sin(elapsedTime * 0.1) * Math.sin(elapsedTime * 0.1)) * 0.3)
        blobRef.current.scale.set(scale, scale, scale)
    })

    return (
        <group
            ref={blobRef}
        >
            <mesh>
                {/* <sphereGeometry ref={geom} args={[2.5, 32]} /> */}
                <icosahedronBufferGeometry
                    ref={geom}
                    args={[1.9, 128]}
                >
                    <ComputedAttribute name="density" compute={computeFlowerDensity} usage={THREE.StaticReadUsage} />
                </icosahedronBufferGeometry>
                <meshPhysicalMaterial
                    normalMap={normalMap}
                    displacementMap={displacementMap}
                    envMapIntensity={0.4}
                    map={texture}
                    clearcoat={0.8}
                    clearcoatRoughness={0}
                    roughness={1}
                    metalness={0}
                />
            </mesh>
            <Html
                transform
                scale={0.2}
                position={[0.8, -0.5, 1.5]}
            // occlude
            >
                <p className="annotation">centerpoint #09566854</p>
            </Html>
        </group>
    )
})
