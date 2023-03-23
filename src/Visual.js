import React, {
    useState,
    useEffect
    // TODO: remove
    // Suspense
} from 'react';

import {
    Canvas,
    // TODO: remove
    // extend,
    // useLoader,
    // useFrame,
    // useThree
} from '@react-three/fiber';

import {
    OrbitControls,
    CameraShake,
    Environment,
    Float,
    // TODO: remove
    // Edges,
    // Stage
} from '@react-three/drei';

// TODO: remove
// import * as THREE from 'three';

// TODO: remove
// import { Blob } from './Elements/Blob';
import { Clouds } from './Elements/Clouds';
import Objet from './Elements/Objet';
import Particles from './Elements/Particles';
import Effects from './Elements/Effects';
// TODO: remove
// import Text from './Elements/Text';

import './Visual.css';

// import HDR from "./abstract.hdr";

// TODO: remove
// rotation and scale values for different objects
// const defaults = {
//     icosahedron: {
//         rotation: [0, 0, 0],
//         scale: [0.8, 0.8, 0.8]
//     },
//     torusKnot: {
//         rotation: [0, 0, 0],
//         scale: [0.3, 0.3, 0.3]
//     }
// };

const textures = [
    '01',
    '02',
    '02a',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15'
];

const MainVisual = (props) => {
    const {
        id,
        value,
        name,
        perc1,
        perc2,
        perc3,
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
        a1,
        modifiers,
        baseModifiers
    } = props;

    const [canvasPresent, setCanvasPresent] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState({
        active: true,
        loaded: 0,
        total: 0
    });

    // (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    // TODO: remove
    // const ref = useRef();

    let tex = textures[Math.floor(textures.length * (perc3 / 100))];

    // (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    useEffect(() => {
        let timeout = setTimeout(() =>setCanvasPresent(true), 400);

        return () => clearTimeout(timeout);
    }, []);

    // (╯°益°)╯彡┻━┻ -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

    if (!modifiers) return null;
    return (
        <div
            id="visual"
            style={{
                background: `radial-gradient(circle, rgba(${r2}, ${g2}, ${b2}, 0.8) 15%, transparent 64%)`
            }}
        >
            <div id="visual-loading" className={!loadingStatus?.active ? 'loading-complete' : null}>
                <p id="animoji">{`(∪｡∪)｡｡｡`}</p>
                <div className='loading-bar-wrap'><div style={{ transform: `translateX(-${100 - ((loadingStatus.loaded / loadingStatus?.total) * 100)})` }}></div></div>
            </div>

            {canvasPresent &&
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 5], fov: 45 }}
                >
                    {/* // TODO: remove */}
                    {/* <spotLight
                        intensity={0.8}
                        angle={0.2}
                        penumbra={1}
                        position={[5, 12, 10]}
                    /> */}
                    <Float
                        speed={baseModifiers.float_speed * (modifiers ? modifiers.fsMod : 1)}
                        rotationIntensity={baseModifiers.float_rotation_intensity * (modifiers ? modifiers.friMod : 1)}
                        floatIntensity={baseModifiers.float_intensity * (modifiers ? modifiers.fiMod : 1)}
                        floatingRange={[baseModifiers.float_range_start * (modifiers ? modifiers.frMod : 1), baseModifiers.float_range_end * (modifiers ? modifiers.frMod : 1)]}
                    >
                        <group
                            position={[0, 0, -2]}
                        >
                            {/* // TODO: remove */}
                            {/* <Blob
                                tex={tex}
                                color={`rgb(${r1}, ${g1}, ${b1})`}
                                modifiers={modifiers}
                                baseModifiers={baseModifiers}
                            /> */}
                            <Objet
                                tex={tex}
                                returnProgress={loadingStatus.active}
                                setLoadingStatus={setLoadingStatus}
                            />
                        </group>
                    </Float>
                    <Particles
                        count={value * 10}
                        color1={`rgb(${r1}, ${g1}, ${b1})`}
                        color2={`rgb(${r2}, ${g2}, ${b2})`}
                        particleSpeed={baseModifiers.particle_speed * (modifiers ? modifiers.psMod : 1)}
                    />
                    <Effects />
                    <Clouds
                        color={`rgb(${r1}, ${g1}, ${b1})`}
                    />
                    <CameraShake
                        maxRoll={0.08}
                        maxPitch={0.08}
                        maxYaw={0.08}
                    />
                    <Environment files="./hdr/abstract.hdr" blur={0.5} />
                    <OrbitControls
                        makeDefault
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableZoom={true}
                        minDistance={8}
                        maxDistance={25}
                        minPolarAngle={Math.PI * 0.35}
                        maxPolarAngle={Math.PI * 0.65}
                    />
                </Canvas>
            }
        </div>
    );
};

export default MainVisual;