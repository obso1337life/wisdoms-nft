import * as THREE from 'three'
import { forwardRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { LayerMaterial, Texture } from 'lamina'

export const Bush = forwardRef((props, ref) => {
    const { nodes } = useGLTF('/models/przyroda2.glb')
    const map = useTexture('/textures/blob/01/01.jpg')

    return (
        <group>
            <instancedMesh ref={ref} args={[undefined, undefined, 1000]} castShadow receiveShadow geometry={nodes.Scene.children[1].geometry} {...props}>
                <LayerMaterial lighting="standard" side={THREE.DoubleSide}>
                    <Texture map={map} />
                    {/* <Texture map={ao} mode="multiply" /> */}
                </LayerMaterial>
            </instancedMesh>
        </group>
    )
})
