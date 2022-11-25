import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Avatar from '../../components/avatar';
import useAnimationStore from '../../stores/useAnimationStore';

function WrappedCanvas() {
  useFrame((state) => {
    if (useAnimationStore.getState().animationPlaying) {
      useAnimationStore
        .getState()
        .setCurrentTime(
          state.clock.getElapsedTime() % useAnimationStore.getState().timeLimit
        );
    }
  });

  return (
    <>
      <OrbitControls />
      <spotLight position={[0, 2, 1]} intensity={0.4} />
      <Suspense>
        <Avatar modelUrl='/3d-models/vrm-characters/sanji.vrm' />
      </Suspense>
    </>
  );
}

function MainScene() {
  return (
    <Canvas
      onCreated={({ camera }) => {
        camera.position.y = 2;
        camera.updateProjectionMatrix();
      }}
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <WrappedCanvas />
    </Canvas>
  );
}

export default MainScene;
