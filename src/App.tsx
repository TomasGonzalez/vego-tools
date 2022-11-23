import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Avatar from './components/Avatar';
import DraggableVideoScreen from './components/draggable-video-screen';
import useVCaptureLogic from './hooks/useVCaptureLogic';
import { useControls } from 'leva';
import useMainStore from './stores/useMainStore';

function App() {
  const { videoElement } = useVCaptureLogic();

  const { currentTimeline } = useControls({
    currentTimeline: {
      value: useMainStore.getState().timeline,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  useEffect(() => {
    useMainStore.getState().setTimeline(currentTimeline);
  }, [currentTimeline]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      <DraggableVideoScreen ref={videoElement} />
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
        <OrbitControls />
        <spotLight position={[0, 2, 1]} intensity={0.4} />
        <Suspense>
          <Avatar modelUrl='/3d-models/vrm-characters/sanji.vrm' />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
