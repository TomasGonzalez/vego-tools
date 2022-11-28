import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Avatar from '../../components/avatar';
import useAnimationStore from '../../stores/useAnimationStore';

function WrappedCanvas() {
  useFrame(({}, delta) => {
    if (useAnimationStore.getState().mode === 'playing') {
      useAnimationStore.getState().addTime(delta);
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
        backgroundColor: 'white',
        // background:
        //    'url(https://i.pinimg.com/736x/e6/87/c6/e687c6e7dea993b7bd49c9541f5c5688.jpg)',
      }}
    >
      <WrappedCanvas />
    </Canvas>
  );
}

export default MainScene;
