import {
    useTexture,
    Edges
} from '@react-three/drei';

import * as THREE from 'three';

const Circle = (props) => {

    const {
        settings,
        position,
        edges,
        color,
        opacity,
        wireframe
    } = props;

    return (
        <mesh
            position={position}
        >
            <circleGeometry args={settings} />
            <meshPhysicalMaterial
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
    );

};

export default Circle;