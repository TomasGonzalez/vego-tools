import { useFrame } from '@react-three/fiber';
import useTrackingStore, { TState } from '../../../stores/useMainStore';
import useTransformHelpers from './useTransformHelpers';

function usePoseTracker() {
  const { rigRotation, rigPosition } = useTransformHelpers();

  useFrame(() => {
    const riggedPose = useTrackingStore.getState().poseRig;

    if (riggedPose) {
      rigRotation('Hips', riggedPose.Hips.rotation, 0.7);
      rigPosition(
        'Hips',
        {
          x: -riggedPose.Hips.position.x, // Reverse direction
          y: riggedPose.Hips.position.y + 1, // Add a bit of height
          z: -riggedPose.Hips.position.z, // Reverse direction
        },
        1,
        0.07
      );
      rigRotation('Chest', riggedPose.Spine, 0.25, 0.3);
      rigRotation('Spine', riggedPose.Spine, 0.45, 0.3);

      rigRotation('RightUpperArm', riggedPose.RightUpperArm, 1, 0.3);
      rigRotation('RightLowerArm', riggedPose.RightLowerArm, 1, 0.3);
      rigRotation('LeftUpperArm', riggedPose.LeftUpperArm, 1, 0.3);
      rigRotation('LeftLowerArm', riggedPose.LeftLowerArm, 1, 0.3);

      rigRotation('LeftUpperLeg', riggedPose.LeftUpperLeg, 1, 0.3);
      rigRotation('LeftLowerLeg', riggedPose.LeftLowerLeg, 1, 0.3);
      rigRotation('RightUpperLeg', riggedPose.RightUpperLeg, 1, 0.3);
      rigRotation('RightLowerLeg', riggedPose.RightLowerLeg, 1, 0.3);
    }
  });
}

export default usePoseTracker;
