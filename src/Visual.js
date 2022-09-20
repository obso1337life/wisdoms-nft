import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, extend, useLoader, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PresentationControls, Environment, Effects, Loader, useTexture, Html, CameraShake, Float } from '@react-three/drei'
import * as THREE from 'three'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'
import { Blob } from './Elements/Blob'
import { Hair } from './Elements/Hair'
import { Clouds } from './Elements/Clouds'
import Particles from './Elements/Particles'
import Sparks from './Elements/Sparks'
import './Visual.css';

export default function MainVisual(props) {

    const {
        id,
        type
    } = props

    const [intVal, setIntVal] = useState(null)
    const [charString, setCharString] = useState(null)
    const [charVal, setCharVal] = useState(null)
    const [long, setLong] = useState(null)
    const [short, setShort] = useState(null)
    const [longInt, setLongInt] = useState(null)
    const [shortInt, setShortInt] = useState(null)
    const [high, setHigh] = useState(null)
    const [low, setLow] = useState(null)

    const mouse = useRef([0, 0])

    extend({ LUTPass })

    useEffect(() => {

        let iV = id.replace(/\D/g, '')
        let cS = id.replace(/\d/g, '')
        setIntVal(iV)
        setCharString(cS)

        let cV = 0;
        for (let i = 0; i < cS.length; i++) {
            cV += cS.charCodeAt(i);
        };
        cV += '';
        setCharVal(cV)

        let l = intVal.length >= charVal.length ? intVal : charVal
        let s = l === intVal ? charVal : intVal
        l = l.slice(0, s.length)
        setLong(l)
        setShort(s)

        let lI = parseInt(l)
        let sI = parseInt(s)
        setLongInt(lI)
        setShortInt(sI)

        let h = lI >= sI ? lI : sI;
        let lo= h === lI ? sI : lI;
        setHigh(h)
        setLow(lo)

    }, [id])

    return (
        <div id="visual">
            <div id="info">
                <div>#</div>
                <div>#</div>
                <div>#</div>
                <div>#</div>
                <div>#</div>
            </div>
            <div id="blur"></div>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <spotLight
                    intensity={0.8}
                    angle={0.2}
                    penumbra={1}
                    position={[5, 15, 10]}
                />
                <Suspense
                    fallback={null}
                >
                    <PresentationControls
                        global
                        config={{ mass: 2, tension: 100 }}
                        snap={{ mass: 5, tension: 100 }}
                        rotation={[0, Math.PI / 16, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}>
                        <Hair>
                            <Blob
                                type={type}
                            />
                        </Hair>
                    </PresentationControls>
                    <Environment
                        preset="warehouse"
                    />
                    <Particles
                        count={500}
                        mouse={mouse}
                        type={type}
                    />
                    <Clouds />
                    <Effects />
                    {/* <Sparks count={20} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']} /> */}
                    <CameraShake
                        maxRoll={0.08}
                        maxPitch={0.08}
                        maxYaw={0.08}
                    />
                </Suspense>
            </Canvas>
        </div>
    )

}