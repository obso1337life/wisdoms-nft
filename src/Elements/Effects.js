import React,
{
    useEffect,
    useState,
    useRef,
} from 'react';

import {
    extend,
    useFrame,
    useThree
} from "@react-three/fiber";

import {
    EffectComposer,
    Bloom,
    DepthOfField,
    Noise,
    ChromaticAberration
} from '@react-three/postprocessing';

import { BlendFunction } from 'postprocessing';

const Effects = () => {

    return (
        <EffectComposer>
            <DepthOfField
                focusDistance={0}
                focalLength={0.5}
                bokehScale={2}
                height={480}
            />
            <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.7}
                intensity={1.2}
                height={350}
            />
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.002, 0.0002]}
            />
        </EffectComposer>
    );

};

export default Effects;