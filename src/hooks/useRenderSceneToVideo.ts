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
        const renderChunks: any[] | undefined = [];
        canvasStream.current = canvasRef.current.captureStream();

        mediaRecorderObject.current = new MediaRecorder(canvasStream.current, {
          mimeType: 'video/webm',
        });

        // Save the recordings to this array
        mediaRecorderObject.current.ondataavailable = (e: any) => {
          console.log('adding new data', e.data);
          renderChunks.push(e.data);
        };

        mediaRecorderObject.current.onstop = () => {
          console.log('is on stop running');
          const fullBlob = new Blob(renderChunks, { type: 'video/webm' });
          const downloadUrl = window.URL.createObjectURL(fullBlob);
          console.log({ fullBlob });
          console.log({ downloadUrl });
        };

        // Start rendering by changing the canvas frame by frame and copturing it
        mediaRecorderObject.current.onstart = async () => {
          setCurrentTime(0);

          while (
            useAnimationStore.getState().currentTime <
            useAnimationStore.getState().animationTimeLimit
          ) {
            useAnimationStore.getState().setTimeNextFrame();

            // I need to find a way to wayt until the canvas is updated without relying on an arbitrary time wait
            await new Promise((resolve) => setTimeout(resolve, 100));
            console.log('added frame');
          }

          setMode('default');
        };

        mediaRecorderObject.current.start();
      } else if (mediaRecorderObject?.current?.state === 'recording') {
        console.log('called stop');

        mediaRecorderObject.current.stop();
      }
    }
  }, [canvasRef.current, mode]);

  return { canvasRef };
}

export default useRenderScene;
