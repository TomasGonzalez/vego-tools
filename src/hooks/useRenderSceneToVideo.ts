import { useRef, useEffect } from 'react';
import useAnimationStore from '../stores/useAnimationStore';

function useRenderScene() {
  const canvasRef = useRef<any>();
  const mediaRecorderObject = useRef<any>();
  const mode = useAnimationStore((store) => store.mode);

  useEffect(() => {
    if (canvasRef.current && mode === 'rendering') {
      mediaRecorderObject.current = new MediaRecorder(
        canvasRef.current.captureStream(24)
      );

      mediaRecorderObject.current.onstart = () => {
        console.log('started recording');
      };

      mediaRecorderObject.current.start();
    } else {
      mediaRecorderObject.current.stop();
    }
  }, [canvasRef.current, mode]);

  return { canvasRef };
}

export default useRenderScene;
