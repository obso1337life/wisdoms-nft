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

const BigRing = (props) => {

    const {
        scale,
        ringScale,
        ringPos,
        position,
        settings,
        color,
        move,
        spin,
        wireframe,
        opacity,
        tex,
        num,
        edges
    } = props;

    const Ring = (props) => {

        const {
            position,
            settings
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
                position={position}
                scale={ringScale}
            >
                <ringGeometry args={settings} />
                <meshPhysicalMaterial
                    normalMap={normalMap}
                    displacementMap={displacementMap}
                    color={color}
                    transparent
                    opacity={opacity}
                    wireframe={wireframe}
                    side={THREE.DoubleSide}
                />
                {edges &&
                    <Edges
                        scale={0.95}
                        threshold={10}
                    >
                        <lineBasicMaterial
                            color={color}
                            toneMapped={false}
                        />
                    </Edges>
                }
            </mesh>
        )

    }

    return (
        <group
            position={position}
            scale={scale}
        >
            {[...Array(num).keys()].map((elem, i, arr) => {
                return (
                    <group
                        rotation={[0, 0, ((Math.PI / arr.length) * i) * 2]}
                    >
                        <Ring
                            position={[0, ringPos, i % 2 === 0 ? 0 : 0.05]}
                            settings={settings}
                        />
                    </group>
                )
            })}
        </group>
    );

};

export default BigRing;