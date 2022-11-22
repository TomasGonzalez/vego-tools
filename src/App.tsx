import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Avatar from './components/Avatar';
import DraggableVideoScreen from './components/draggable-video-screen';
import useVCaptureLogic from './hooks/useVCaptureLogic';

function App() {
  const { videoElement } = useVCaptureLogic();

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
          <Avatar modelUrl='/3d-models/vrm-characters/power.vrm' />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
