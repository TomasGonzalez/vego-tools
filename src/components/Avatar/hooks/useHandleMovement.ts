import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';

import config from '../../../constants/config';
import useAnimationStore from '../../../stores/useAnimationStore';
import useMainStore from '../../../stores/useCharacterStore';
import useCaptureMovement from './useCaptureMovement';
import useFaceTracker from './useUpdateFace';
import useHandsTracker from './useUpdateHands';
import usePoseTracker from './useUpdatePose';

function useHandleMovement(mode: string, recordingTime: number) {
  const riggedPose = useMainStore(({ poseRig }) => poseRig);
  const riggedFace = useMainStore(({ faceRig }) => faceRig);
  const riggedLeftHandRig = useMainStore(({ leftHandRig }) => leftHandRig);
  const riggedRightHandRig = useMainStore(({ rightHandRig }) => rightHandRig);

  const applyPose = usePoseTracker();
  const applyFace = useFaceTracker();
  const applyHands = useHandsTracker();

  const {
    recordPoseMovement,
    recordFaceMovement,
    recordLeftHandMovement,
    recordRightHandMovement,
  } = useCaptureMovement();

  useFrame(() => {
    switch (mode) {
      case 'recording':
        recordPoseMovement.current.push(riggedPose);

        if (riggedPose) applyPose(riggedPose);

        recordFaceMovement.current.push(riggedFace);

        if (riggedFace) applyFace(riggedFace);

        recordRightHandMovement.current.push(riggedRightHandRig);
        recordLeftHandMovement.current.push(riggedLeftHandRig);

        applyHands(riggedLeftHandRig, riggedRightHandRig);

        break;

      // Move avatar to match timeline recording if not recording
      case 'default':
      case 'rendering':
      case 'playing':
        if (recordPoseMovement.current && recordFaceMovement.current) {
          let indexAtPercentage = 0;

          if (
            recordingTime &&
            recordingTime <= useAnimationStore.getState().timeLimit
          ) {
            indexAtPercentage = Math.round(
              ((recordPoseMovement.current.length - 1) *
                useAnimationStore.getState().currentTime) /
                recordingTime // Amount of recording time for this object
            );
          }

          applyPose(recordPoseMovement.current[indexAtPercentage]);
          applyFace(recordFaceMovement.current[indexAtPercentage]);
          applyHands(
            recordLeftHandMovement.current[indexAtPercentage],
            recordRightHandMovement.current[indexAtPercentage]
          );
        }
        break;

      default:
        break;
    }
  });
}

export default useHandleMovement;
