import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Face, TFace } from 'kalidokit';
import { useRef } from 'react';
import { Euler } from 'three';
import { clamp, lerp } from 'three/src/math/MathUtils';

import useTrackingStore from '../../../stores/useMainStore';
import useTransformHelpers from './useTransformHelpers';

function useFaceTracker() {
  const { rigRotation } = useTransformHelpers();
  const oldLookTarget = useRef(new Euler());

  const applyFace = (newPose: TFace) => {
    const avatar = useTrackingStore.getState().avatar;

    if (newPose) {
      rigRotation('Neck', newPose.head, 0.7);

      if (!avatar) return;
      // Blendshapes and Preset Name Schema
      const Blendshape = avatar.expressionManager;
      const PresetName = VRMExpressionPresetName;

      // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
      // for VRM, 1 is closed, 0 is open.
      if (Blendshape) {
        newPose.eye.l = lerp(
          clamp(1 - newPose.eye.l, 0, 1),
          Blendshape.getValue(PresetName.Blink) as number,
          0.5
        );

        newPose.eye.r = lerp(
          clamp(1 - newPose.eye.r, 0, 1),
          Blendshape.getValue(PresetName.Blink) as number,
          0.5
        );

        newPose.eye = Face.stabilizeBlink(newPose.eye, newPose.head.y);
        Blendshape.setValue(PresetName.Blink, newPose.eye.l);

        // Interpolate and set mouth blendshapes Blendshape.setValue(
        PresetName.Ih,
          lerp(
            newPose.mouth.shape.I,
            Blendshape.getValue(PresetName.Ih) as number,
            0.5
          );

        Blendshape.setValue(
          PresetName.Aa,
          lerp(
            newPose.mouth.shape.A,
            Blendshape.getValue(PresetName.Aa) as number,
            0.5
          )
        );

        Blendshape.setValue(
          PresetName.Ee,
          lerp(
            newPose.mouth.shape.E,
            Blendshape.getValue(PresetName.Ee) as number,
            0.5
          )
        );

        Blendshape.setValue(
          PresetName.Oh,
          lerp(
            newPose.mouth.shape.O,
            Blendshape.getValue(PresetName.Oh) as number,
            0.5
          )
        );

        Blendshape.setValue(
          PresetName.Ou,
          lerp(
            newPose.mouth.shape.U,
            Blendshape.getValue(PresetName.Ou) as number,
            0.5
          )
        );
      }

      //PUPILS
      //interpolate pupil and keep a copy of the value
      let lookTarget = new Euler(
        lerp(oldLookTarget.current.x, newPose.pupil.y, 0.4),
        lerp(oldLookTarget.current.y, newPose.pupil.x, 0.4),
        0,
        'XYZ'
      );

      oldLookTarget.current.copy(lookTarget);
      //@ts-ignore
      newPose?.lookAt?.applier.lookAt(lookTarget);
    }
  };

  return applyFace;
}

export default useFaceTracker;
