import { useRef, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

import useAnimationStore from '../stores/useAnimationStore';

function useRenderScene() {
  const canvasRef = useRef<any>();
  const mediaRecorderObject = useRef<any>();

  const setCurrentTime = useAnimationStore((store) => store.setCurrentTime);
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);
  const setRenderBlob = useAnimationStore((store) => store.setRenderBlob);

  useEffect(() => {
    (async () => {
      if (canvasRef.current) {
        if (mode === 'rendering') {
          const ffmpeg = createFFmpeg({ log: true });
          let frameCount = 0;
          await ffmpeg.load();

          const onFinishCapturing = async () => {
            console.log('is on stop running');

            // Create an array of image data
            console.log('loading images in ffmpeg');

            // new Array(frameCount).forEach(async (_, i) => {
            //   // console.log(urlBlob, 'this is image to render');
            //   const num = `00${i}`.slice(-3);
            //   try {
            //     const written = ffmpeg.FS(
            //       'writeFile',
            //       `tmp.${num}.png`,
            //       urlBlob
            //     );
            //     console.log(written);
            //   } catch (err) {
            //     console.log(err);
            //   }
            // });

            console.log('running ffmpeg');

            await ffmpeg.run(
              '-framerate',
              '30',
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

            // TO_DO attach the images into a video Blob using FFMPEG
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
          };

          // Start rendering by changing the canvas frame by frame and copturing it
          const captureFrames = async () => {
            setCurrentTime(0);

            console.log('capture frame?');

            while (
              useAnimationStore.getState().currentTime <
              useAnimationStore.getState().animationRecordTime
            ) {
              useAnimationStore.getState().setTimeNextFrame();

              console.log(
                useAnimationStore.getState().currentTime,
                'this is the current time'
              );

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
                console.log('Test');
              } catch (err) {
                console.log(err);
              }

              // renderChunks.push(canvasRef.current.toDataURL('image/png'));
              // console.log(
              //   'render chunks',
              //   canvasRef.current.toDataURL('image/png', 1.0)
              // );

              // console.log('added frame');
            }

            onFinishCapturing();
          };

          captureFrames();
        }
      }
    })();
  }, [canvasRef.current, mode]);

  return { canvasRef };
}

export default useRenderScene;
