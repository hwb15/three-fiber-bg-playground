/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/banana-v1-transformed.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.banana_high.geometry}
        material={nodes.banana_high.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.banana_mid.geometry}
        material={nodes.banana_mid.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.banana_low.geometry}
        material={nodes.banana_low.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/banana-v1-transformed-transformed.glb");
