import { EffectComposer, Bloom, DepthOfField, Noise, Vignette, Glitch, ChromaticAberration } from '@react-three/postprocessing';
import { GlitchMode, BlendFunction } from 'postprocessing';

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
                intensity={2.2}
                height={350}
            />
            {/* <Noise
                opacity={0.8}
            /> */}
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL} // blend mode
                offset={[0.002, 0.0002]} // color offset
            />
            {/* <Vignette
                eskil={false}
                offset={0.1}
                darkness={0.8}
            /> */}
            {/* <Glitch
                delay={[1.5, 3.5]} // min and max glitch delay
                duration={[0.2, 0.5]} // min and max glitch duration
                strength={[0.001, 0.005]} // min and max glitch strength
                mode={GlitchMode.SPORADIC} // glitch mode
                active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                ratio={0.95} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            /> */}
        </EffectComposer>
    )

};

export default Effects;