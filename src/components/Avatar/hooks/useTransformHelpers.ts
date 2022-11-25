import { VRMHumanBoneName } from '@pixiv/three-vrm';
import { Euler, Quaternion, Vector3 } from 'three';
import useMainStore from '../../../stores/useCharacterStore';

function useTransformHelpers() {
  const avatar = useMainStore.getState().avatar;
  const rigRotation = (
    name: keyof typeof VRMHumanBoneName,
    rotation = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!avatar) {
      return;
    }
    const Part = avatar.humanoid.getNormalizedBoneNode(VRMHumanBoneName[name]);
    if (!Part) {
      return;
    }

    let euler = new Euler(
      rotation.x * dampener,
      rotation.y * dampener,
      rotation.z * dampener
    );

    let quaternion = new Quaternion().setFromEuler(euler);
    Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
  };

  // Animate Position Helper Function
  const rigPosition = (
    name: keyof typeof VRMHumanBoneName,
    position = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    if (!avatar) {
      return;
    }

    const Part = avatar.humanoid.getNormalizedBoneNode(VRMHumanBoneName[name]);
    if (!Part) {
      return;
    }

    let vector = new Vector3(
      position.x * dampener,
      position.y * dampener,
      position.z * dampener
    );
    Part.position.lerp(vector, lerpAmount); // interpolate
  };

  return { rigPosition, rigRotation };
}

export default useTransformHelpers;
