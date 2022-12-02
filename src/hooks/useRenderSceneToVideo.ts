import { useRef, useEffect } from 'react';
import useAnimationStore from '../stores/useAnimationStore';

function useRenderScene() {
  const canvasRef = useRef<any>();
  const mediaRecorderObject = useRef<any>();
  const canvasStream = useRef<any>();

  const setCurrentTime = useAnimationStore((store) => store.setCurrentTime);
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);

  useEffect(() => {
    if (canvasRef.current) {
      if (
        mode === 'rendering' &&
        mediaRecorderObject?.current?.state !== 'recording'
      ) {
        canvasStream.current = canvasRef.current.captureStream();
        mediaRecorderObject.current = new MediaRecorder(canvasStream.current);

        // Start rendering by changing the canvas frame by frame and copturing it

        mediaRecorderObject.current.onstart = () => {
          console.log('setting current time');
          setCurrentTime(0);
          while (
            useAnimationStore.getState().currentTime <
            useAnimationStore.getState().animationTimeLimit
          ) {
            console.log(
              'current time',
              useAnimationStore.getState().currentTime
            );
            useAnimationStore.getState().setTimeNextFrame();
          }
          setMode('default');
        };

        mediaRecorderObject.current.start();
      } else if (mediaRecorderObject?.current?.state === 'recording') {
        mediaRecorderObject.current.stop();
      }
    }
  }, [canvasRef.current, mode]);

  return { canvasRef };
}

export default useRenderScene;
