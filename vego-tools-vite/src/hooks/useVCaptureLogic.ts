import { useRef } from 'react';
import useKalidokit from './useKalidokit';

const useVCaptureLogic = () => {
  const videoElement = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  useKalidokit(videoElement, cameraRef);

  return {
    videoElement,
  };
};

export default useVCaptureLogic;
