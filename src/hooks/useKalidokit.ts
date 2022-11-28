import { useEffect } from 'react';
import { Face, Pose, Hand, TFace, TPose, THand } from 'kalidokit';
import {
  FACEMESH_TESSELATION,
  HAND_CONNECTIONS,
  Holistic,
  POSE_CONNECTIONS,
} from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import '@mediapipe/control_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

import useCharacterStore from '../stores/useCharacterStore';
import useAnimationStore from '../stores/useAnimationStore';

const useKalidokit = (videoElement: any, cameraRef: any) => {
  useEffect(() => {
    if (!useCharacterStore.getState().holistic) {
      const holistic = new Holistic({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
        },
      });

      holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
        refineFaceLandmarks: true,
      });

      useCharacterStore.getState().setHolistic(holistic);
    }

    useCharacterStore.getState().holistic?.onResults((results: any) => {
      const guideCanvas: any = document.getElementById('guides');
      guideCanvas.width = videoElement?.current?.videoWidth;
      guideCanvas.height = videoElement?.current?.videoHeight;
      let canvasCtx = guideCanvas.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);

      // Use `Mediapipe` drawing functions
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#00cff7',
        lineWidth: 4,
      });

      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: '#ff0364',
        lineWidth: 2,
      });

      drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
        color: '#ff0000',
        lineWidth: 2,
        radius: 2,
        fillColor: '#ffff11',
        visibilityMin: 0,
      });

      if (results.faceLandmarks && results.faceLandmarks.length === 478) {
        //draw pupils
        drawLandmarks(
          canvasCtx,
          [results.faceLandmarks[468], results.faceLandmarks[468 + 5]],
          {
            color: '#ffe603',
            lineWidth: 2,
          }
        );
      }

      drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
        color: '#eb1064',
        lineWidth: 5,
      });

      drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: '#00cff7',
        lineWidth: 2,
      });

      drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
        color: '#22c3e3',
        lineWidth: 5,
      });

      drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: '#ff0364',
        lineWidth: 2,
      });

      canvasCtx.restore();

      const facelm = results.faceLandmarks;
      const poselm = results.poseLandmarks;
      const poselm3D = results.ea;

      //Idk why but leftHandlm controlls the oposite hand
      const leftHandlm = results.rightHandLandmarks;
      const rightHandlm = results.leftHandLandmarks;

      if (facelm) {
        useCharacterStore.getState().setFaceRig(
          Face.solve(facelm, {
            runtime: 'mediapipe',
            video: videoElement.current,
          }) as TFace
        );
      }

      if (poselm3D && poselm)
        useCharacterStore.getState().setPoseRig(
          Pose.solve(poselm3D, poselm, {
            runtime: 'mediapipe',
            video: videoElement.current,
          }) as TPose
        );

      if (rightHandlm)
        useCharacterStore
          .getState()
          .setRightHandRig(Hand.solve(rightHandlm, 'Right') as THand<'Right'>);

      if (leftHandlm)
        useCharacterStore
          .getState()
          .setLeftHandRig(Hand.solve(leftHandlm, 'Left') as THand<'Left'>);
    });

    (async function initCamara() {
      cameraRef.current = new Camera(videoElement.current, {
        onFrame: async () => {
          if (useAnimationStore.getState().mode !== 'recording') return;

          return await useCharacterStore
            .getState()
            .holistic?.send({ image: videoElement.current });
        },
        width: 900,
        height: 600,
      });

      //turn off camera just for testing remove this
      cameraRef.current.start();
    })();
  }, [cameraRef, videoElement]);
};

export default useKalidokit;
