import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';

import config from '../../../constants/config';
import useAnimationStore from '../../../stores/useAnimationStore';
import useMainStore from '../../../stores/useCharacterStore';
import useCaptureMovement from './useCaptureMovement';
import useFaceTracker from './useUpdateFace';
import useHandsTracker from './useUpdateHands';
import usePoseTracker from './useUpdatePose';

function useHandleMovement(mode: string, recordingTime: RefObject<number>) {
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
        if (riggedPose) {
          recordPoseMovement.current.push(riggedPose);
          applyPose(riggedPose);
        }

        if (riggedFace) {
          recordFaceMovement.current.push(riggedFace);
          applyFace(riggedFace);
        }

        if (riggedRightHandRig)
          recordRightHandMovement.current.push(riggedRightHandRig);

        if (riggedLeftHandRig)
          recordLeftHandMovement.current.push(riggedLeftHandRig);

        applyHands(riggedLeftHandRig, riggedRightHandRig);

        break;

      case 'default':
      case 'playing':
        if (recordPoseMovement.current && recordFaceMovement.current) {
          let indexAtPercentage = 0;

          if (
            recordingTime.current &&
            recordingTime.current <= config.maxRecordingTime
          ) {
            indexAtPercentage = Math.round(
              ((recordPoseMovement.current.length - 1) *
                useAnimationStore.getState().currentTime) /
                recordingTime.current // Amount of recording time for this object
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
