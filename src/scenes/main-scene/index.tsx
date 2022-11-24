import { Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

import useMainStore from '../../stores/useMainStore';
import config from '../../constants/config';
import Avatar from '../../components/avatar';

function WrappedCanvas() {
  const { playAnimation } = useControls({
    playAnimation: false,
  });

  const { currentTimeline } = useControls({
    currentTimeline: {
      value: useMainStore.getState().timeline,
      min: 0,
      max: config.maxRecordingTime,
      step: 0.1,
    },
  });

  useEffect(() => {
    useMainStore.getState().setTimeline(currentTimeline);
  }, [currentTimeline]);

  useFrame((state) => {
    if (playAnimation) {
      useMainStore
        .getState()
        .setTimeline(state.clock.getElapsedTime() % config.maxRecordingTime);
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
