import React, { useState, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import blackMetal from '../assets/fonts/black_metal.json'
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"
import * as THREE from 'three'

const clock = new THREE.Clock()

export default function Text(props) {

    extend({ TextGeometry })

    const {
        name
    } = props

    const [posIndex, setPosIndex] = useState(0)
    const [positions] = useState([
        {
            pos: [-5, 0.2, 0],
            del: 5
        },
        {
            pos: [-1.5, -0.3, 1.5],
            del: 5
        },
        {
            pos: [-1, -1, 2],
            del: 3
        },
        {
            pos: [-0.5, -0.8, 2],
            del: 3
        },
        {
            pos: [-0.8, -1, 2],
            del: 3
        },
        {
            pos: [5, 0, 3],
            del: 3
        },
        {
            pos: [5, 8, 3],
            del: 3
        }
    ])
    const textRef = useRef();
    const materialRef = useRef();
    const font = new FontLoader().parse(blackMetal);

    return (
        <>
            {name &&
                <MotionConfig
                    transition={{
                        duration: 20,
                        ease: 'easeInOut',
                        type: 'spring',
                        bounce: 0.25,
                        repeat: Infinity,
                        repeatType: 'loop'
                    }}
                >
                    <motion.mesh
                        ref={textRef}
                        position={positions[posIndex].pos}
                        style={{ originX: 0.5 }}
                        animate={{
                            x: [
                                positions[0].pos[0],
                                positions[1].pos[0],
                                positions[2].pos[0],
                                positions[3].pos[0],
                                positions[4].pos[0],
                                positions[5].pos[0]
                            ],
                            y: [
                                positions[0].pos[1],
                                positions[1].pos[1],
                                positions[2].pos[1],
                                positions[3].pos[1],
                                positions[4].pos[1],
                                positions[5].pos[1]
                            ],
                            z: [
                                positions[0].pos[2],
                                positions[1].pos[2],
                                positions[2].pos[2],
                                positions[3].pos[2],
                                positions[4].pos[2],
                                positions[5].pos[2]
                            ],
                            rotateY: [
                                0.5, -0.2, 0.1, -0.3, 0.4, -0.2
                            ],
                            rotateZ: [
                                0.02, -0.01, 0.01, -0.02, 0.01, -0.02
                            ],
                            rotateX: [
                                0.02, -0.01, 0.01, -0.02, 0.01, 0.03
                            ]
                        }}
                    >
                        <textGeometry args={[name, { font, size: 0.2, height: 0.02 }]} />
                        <meshLambertMaterial ref={materialRef} attach='material' color={'white'} opacity={1} transparent={true} />
                    </motion.mesh>
                </MotionConfig>
            }
        </>
    );
};
