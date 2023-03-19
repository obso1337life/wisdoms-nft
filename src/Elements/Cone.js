import {
    useFrame,
    useLoader
} from '@react-three/fiber';

import {
    useTexture,
    Edges
} from '@react-three/drei';

import {
    TextureLoader
} from 'three/src/loaders/TextureLoader';

import * as THREE from 'three';

const Cone = (props) => {

    const {
        settings,
        scale,
        wireframe,
        color,
        tex,
        opacity
    } = props;

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

    return (
        <mesh
            rotation={[Math.PI * -0.5, 0, 0]}
            scale={scale}
        >
            <coneGeometry args={settings} />
            <meshPhysicalMaterial
                normalMap={normalMap}
                displacementMap={displacementMap}
                // map={texture}
                color={color}
                transparent
                opacity={opacity}
                wireframe={wireframe}
                side={THREE.DoubleSide}
            />
            <Edges
                scale={0.95}
                threshold={10}
            >
                <lineBasicMaterial
                    color={color}
                    toneMapped={false}
                />
            </Edges>
        </mesh>
    );

};

export default Cone;