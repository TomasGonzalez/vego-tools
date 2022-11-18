import { useFrame } from '@react-three/fiber';
import useTransformHelpers from './useTransformHelpers';
import useTrackingStore from '../../../stores/useMainStore';

function useHandsTracker() {
  const { rigRotation } = useTransformHelpers();

  useFrame(() => {
    const riggedPose = useTrackingStore.getState().poseRig;
    const riggedLeftHand = useTrackingStore.getState().leftHandRig;
    const riggedRightHand = useTrackingStore.getState().rightHandRig;

    if (riggedLeftHand) {
      rigRotation('LeftHand', {
        // Combine pose rotation Z and hand rotation X Y
        z: riggedPose?.LeftHand.z || 0,
        y: riggedLeftHand.LeftWrist.y,
        x: riggedLeftHand.LeftWrist.x,
      });
      rigRotation('LeftRingProximal', riggedLeftHand.LeftRingProximal);
      rigRotation('LeftRingIntermediate', riggedLeftHand.LeftRingIntermediate);
      rigRotation('LeftRingDistal', riggedLeftHand.LeftRingDistal);
      rigRotation('LeftIndexProximal', riggedLeftHand.LeftIndexProximal);
      rigRotation(
        'LeftIndexIntermediate',
        riggedLeftHand.LeftIndexIntermediate
      );
      rigRotation('LeftIndexDistal', riggedLeftHand.LeftIndexDistal);
      rigRotation('LeftMiddleProximal', riggedLeftHand.LeftMiddleProximal);
      rigRotation(
        'LeftMiddleIntermediate',
        riggedLeftHand.LeftMiddleIntermediate
      );
      rigRotation('LeftMiddleDistal', riggedLeftHand.LeftMiddleDistal);
      rigRotation('LeftThumbProximal', riggedLeftHand.LeftThumbProximal);
      // rigRotation('LeftThumbMetacarpal', riggedLeftHand.LeftThumbIntermediate);
      rigRotation('LeftThumbDistal', riggedLeftHand.LeftThumbDistal);
      rigRotation('LeftLittleProximal', riggedLeftHand.LeftLittleProximal);
      rigRotation(
        'LeftLittleIntermediate',
        riggedLeftHand.LeftLittleIntermediate
      );
      rigRotation('LeftLittleDistal', riggedLeftHand.LeftLittleDistal);
    }

    if (riggedRightHand) {
      rigRotation('RightHand', {
        // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
        z: riggedPose?.RightHand.z || 0,
        y: riggedRightHand.RightWrist.y,
        x: riggedRightHand.RightWrist.x,
      });
      rigRotation('RightRingProximal', riggedRightHand.RightRingProximal);
      rigRotation(
        'RightRingIntermediate',
        riggedRightHand.RightRingIntermediate
      );
      rigRotation('RightRingDistal', riggedRightHand.RightRingDistal);
      rigRotation('RightIndexProximal', riggedRightHand.RightIndexProximal);
      rigRotation(
        'RightIndexIntermediate',
        riggedRightHand.RightIndexIntermediate
      );
      rigRotation('RightIndexDistal', riggedRightHand.RightIndexDistal);
      rigRotation('RightMiddleProximal', riggedRightHand.RightMiddleProximal);
      rigRotation(
        'RightMiddleIntermediate',
        riggedRightHand.RightMiddleIntermediate
      );
      rigRotation('RightMiddleDistal', riggedRightHand.RightMiddleDistal);
      rigRotation('RightThumbProximal', riggedRightHand.RightThumbProximal);
      // rigRotation(
      //   'RightThumbMetacarpal',
      //   riggedRightHand.RightThumbIntermediate
      // );
      rigRotation('RightThumbDistal', riggedRightHand.RightThumbDistal);
      rigRotation('RightLittleProximal', riggedRightHand.RightLittleProximal);
      rigRotation(
        'RightLittleIntermediate',
        riggedRightHand.RightLittleIntermediate
      );
      rigRotation('RightLittleDistal', riggedRightHand.RightLittleDistal);
    }
  });
}

export default useHandsTracker;
