import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Pumpkin({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/pumpkin-v1-transformed.glb");
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.0001),
      (data.rZ += 0.003)
    );
    ref.current.position.set(data.x * width, (data.y += 0.005), z);

    if (data.y > height) {
      data.y = -height;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.Group36326_Retopo_Pumpkin_final_default_0.geometry}
      material={nodes.Group36326_Retopo_Pumpkin_final_default_0.material}
      rotation={[-Math.PI / 2, 0, 0]}
    />
  );
}

export default function App({ count = 150, depth = 80 }) {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 50 }}>
      <color attach="background" args={["#93E1D8"]} />
      <ambientLight intensity={0.1}>
        <spotLight position={[10, 10, 10]} intensity={0.75} />
        <Suspense fallback={null}>
          <Environment preset="lobby" />
          {Array.from({ length: count }, (_, i) => (
            <Pumpkin key={i} z={(-i / count) * depth} />
          ))}
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              focalLength={1}
              bokehScale={5}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </ambientLight>
    </Canvas>
  );
}
