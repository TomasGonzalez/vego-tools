import { TPose } from 'kalidokit';
import useTransformHelpers from './useTransformHelpers';

function usePoseTracker() {
  const { rigRotation, rigPosition } = useTransformHelpers();

  const applyPose = (newPose: TPose) => {
    if (!newPose) return;

    rigRotation('Hips', newPose.Hips.rotation, 0.7);
    rigPosition(
      'Hips',
      {
        x: -newPose.Hips.position.x, // Reverse direction: ;
        y: newPose.Hips.position.y + 1, // Add a bit of height: ;
        z: -newPose.Hips.position.z, // Reverse direction: ;
      },
      1,
      0.07
    );
    rigRotation('Chest', newPose.Spine, 0.25, 0.3);
    rigRotation('Spine', newPose.Spine, 0.45, 0.3);

    rigRotation('RightUpperArm', newPose.RightUpperArm, 1, 0.3);
    rigRotation('RightLowerArm', newPose.RightLowerArm, 1, 0.3);
    rigRotation('LeftUpperArm', newPose.LeftUpperArm, 1, 0.3);
    rigRotation('LeftLowerArm', newPose.LeftLowerArm, 1, 0.3);

    rigRotation('LeftUpperLeg', newPose.LeftUpperLeg, 1, 0.3);
    rigRotation('LeftLowerLeg', newPose.LeftLowerLeg, 1, 0.3);
    rigRotation('RightUpperLeg', newPose.RightUpperLeg, 1, 0.3);
    rigRotation('RightLowerLeg', newPose.RightLowerLeg, 1, 0.3);
  };

  return applyPose;
}

export default usePoseTracker;
