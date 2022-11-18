import { useFrame } from '@react-three/fiber';
import { VRMExpressionPresetName } from '@pixiv/three-vrm';
import { Face } from 'kalidokit';
import { useRef } from 'react';
import { Euler } from 'three';
import { clamp, lerp } from 'three/src/math/MathUtils';
import useTrackingStore, { TState } from '../../../stores/useMainStore';
import useTransformHelpers from './useTransformHelpers';

function useFaceTracker() {
  const { rigRotation } = useTransformHelpers();
  const oldLookTarget = useRef(new Euler());

  useFrame(() => {
    const riggedFace = useTrackingStore.getState().faceRig;
    const avatar = useTrackingStore.getState().avatar;
    if (riggedFace) {
      rigRotation('Neck', riggedFace.head, 0.7);

      if (!avatar) return;
      // Blendshapes and Preset Name Schema
      const Blendshape = avatar.expressionManager;
      const PresetName = VRMExpressionPresetName;

      // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
      // for VRM, 1 is closed, 0 is open.
      if (Blendshape) {
        riggedFace.eye.l = lerp(
          clamp(1 - riggedFace.eye.l, 0, 1),
          Blendshape.getValue(PresetName.Blink) as number,
          0.5
        );

        riggedFace.eye.r = lerp(
          clamp(1 - riggedFace.eye.r, 0, 1),
          Blendshape.getValue(PresetName.Blink) as number,
          0.5
        );

        riggedFace.eye = Face.stabilizeBlink(riggedFace.eye, riggedFace.head.y);
        Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);

        // Interpolate and set mouth blendshapes Blendshape.setValue(
        PresetName.Ih,
          lerp(
            riggedFace.mouth.shape.I,
            Blendshape.getValue(PresetName.Ih) as number,
            0.5
          );

        Blendshape.setValue(
          PresetName.Aa,
          lerp(
            riggedFace.mouth.shape.A,
            Blendshape.getValue(PresetName.Aa) as number,
            0.5
          )
        );

        Blendshape.setValue(
          PresetName.Ee,
          lerp(
            riggedFace.mouth.shape.E,
            Blendshape.getValue(PresetName.Ee) as number,
            0.5
          )
        );

        Blendshape.setValue(
          PresetName.Oh,
          lerp(
            riggedFace.mouth.shape.O,
            Blendshape.getValue(PresetName.Oh) as number,
            0.5
          )
        );

        Blendshape.setValue(
          PresetName.Ou,
          lerp(
            riggedFace.mouth.shape.U,
            Blendshape.getValue(PresetName.Ou) as number,
            0.5
          )
        );
      }

      //PUPILS
      //interpolate pupil and keep a copy of the value
      let lookTarget = new Euler(
        lerp(oldLookTarget.current.x, riggedFace.pupil.y, 0.4),
        lerp(oldLookTarget.current.y, riggedFace.pupil.x, 0.4),
        0,
        'XYZ'
      );

      oldLookTarget.current.copy(lookTarget);

      avatar.lookAt?.applier.applyYawPitch(
        riggedFace.pupil.x,
        riggedFace.pupil.y
      );
    }
  });
}

export default useFaceTracker;
