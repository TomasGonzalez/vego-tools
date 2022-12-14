import { useFrame } from '@react-three/fiber';
import { MutableRefObject } from 'react';
import { Clock } from 'three';

import useAnimationStore from '../../../stores/useAnimationStore';
import useMainStore from '../../../stores/useCharacterStore';
import useCaptureMovement from './useCaptureMovement';
import useFaceTracker from './useUpdateFace';
import useHandsTracker from './useUpdateHands';
import usePoseTracker from './useUpdatePose';

function useHandleMovement(
  mode: string,
  recordingTime: number,
  avatarAnimationClock: MutableRefObject<Clock>
) {
  const riggedPose = useMainStore(({ poseRig }) => poseRig);
  const riggedFace = useMainStore(({ faceRig }) => faceRig);
  const riggedLeftHandRig = useMainStore(({ leftHandRig }) => leftHandRig);
  const riggedRightHandRig = useMainStore(({ rightHandRig }) => rightHandRig);

  const applyPose = usePoseTracker();
  const applyFace = useFaceTracker();
  const applyHands = useHandsTracker();

  const { recordMovement } = useCaptureMovement();

  useFrame((_, delta) => {
    switch (mode) {
      case 'recording':
        // Apply the movement
        if (riggedPose) applyPose(riggedPose);
        if (riggedFace) applyFace(riggedFace);
        applyHands(riggedLeftHandRig, riggedRightHandRig);

        // Move the animation cursor
        useAnimationStore.getState().addTime(delta);

        // Record the movement
        recordMovement.current.set(
          avatarAnimationClock.current.getElapsedTime(),
          {
            pose: riggedPose,
            face: riggedFace,
            leftHand: riggedLeftHandRig,
            rightHandRig: riggedRightHandRig,
          }
        );

        break;

      // Move avatar to match timeline recording if not recording
      case 'default':
      case 'rendering':
      case 'playing':
        if (recordMovement.current) {
          const { currentTime } = useAnimationStore.getState();
          let indexAtCurrentTime = 0;
          let minDiff = Number.MAX_VALUE;

          for (const key of recordMovement.current.keys()) {
            const diff = Math.abs(key - currentTime);

            if (diff < minDiff) {
              indexAtCurrentTime = key;
              minDiff = diff;
            }
          }

          if (recordMovement.current.has(indexAtCurrentTime)) {
            const { pose, face, leftHand, rightHand } =
              recordMovement.current.get(indexAtCurrentTime);

            applyPose(pose);
            applyFace(face);
            applyHands(leftHand, rightHand);
          }
        }
        break;

      default:
        break;
    }
  });
}

export default useHandleMovement;
