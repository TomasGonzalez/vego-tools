import { useRef, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

import useAnimationStore from '../stores/useAnimationStore';
import config from '../constants/config';

function useRenderScene() {
  const canvasRef = useRef<any>();
  const setCurrentTime = useAnimationStore((store) => store.setCurrentTime);
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);
  const setRenderBlob = useAnimationStore((store) => store.setRenderBlob);

  useEffect(() => {
    (async () => {
      if (canvasRef.current && mode === 'rendering') {
        const ffmpeg = createFFmpeg({ log: true });
        let frameCount = 0;
        await ffmpeg.load();

        // Start rendering by changing the canvas frame by frame and copturing it
        setCurrentTime(0);
        while (
          useAnimationStore.getState().currentTime <
          useAnimationStore.getState().animationRecordTime
        ) {
          useAnimationStore.getState().setTimeNextFrame();

          await new Promise((resolve) => setTimeout(resolve, 100));

          const num = `00${frameCount++}`.slice(-3);
          const currentFrame = canvasRef.current
            .toDataURL('image/jpeg')
            .replace(/^data:.+;base64,/, '');

          try {
            ffmpeg.FS(
              'writeFile',
              `tmp.${num}.jpg`,
              Uint8Array.from(atob(currentFrame), (c: string) =>
                c.charCodeAt(0)
              )
            );
          } catch (err) {
            console.log(err);
          }
        }

        await ffmpeg.run(
          '-framerate',
          `${config.renderFPS}`,
          '-pattern_type',
          'glob',
          '-i',
          '*.jpg',
          '-c:a',
          'copy',
          '-shortest',
          '-c:v',
          'libx264',
          '-pix_fmt',
          'yuv420p',
          '-vf',
          'scale=1902:1584',
          'out.mp4'
        );

        const data = ffmpeg.FS('readFile', 'out.mp4');

        for (let i = 0; i < frameCount; i++) {
          const num = `00${i}`.slice(-3);
          ffmpeg.FS('unlink', `tmp.${num}.jpg`);
        }

        const downloadUrl = URL.createObjectURL(
          new Blob([data.buffer], { type: 'video/mp4' })
        );

        setRenderBlob(downloadUrl);
        console.log(downloadUrl);

        setMode('render-results');
      }
    })();
  }, [canvasRef.current, mode]);

  return { canvasRef };
}

export default useRenderScene;
