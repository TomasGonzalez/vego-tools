import { Holistic } from '@mediapipe/holistic';
import { VRM } from '@pixiv/three-vrm';
import { TFace, THand, TPose } from 'kalidokit';
import create from 'zustand';

export interface TState {
  holistic: Holistic | undefined;
  setHolistic: (holistic: Holistic) => void;
  avatar: VRM | undefined;
  setAvatar: (newAvatar: VRM) => void;
  faceRig: TFace | null;
  setFaceRig: (newFaceRig: TFace) => void;
  poseRig: TPose | null;
  setPoseRig: (newPoseRigh: TPose) => void;
  rightHandRig: THand<'Right'> | null;
  setRightHandRig: (newRightHandRig: THand<'Right'>) => void;
  leftHandRig: THand<'Left'> | null;
  setLeftHandRig: (newLeftHandRig: THand<'Left'>) => void;
}

const useMainStore = create<TState>()((set) => ({
  holistic: undefined,
  setHolistic: (newHolisticInstance: any) => {
    set({ holistic: newHolisticInstance });
  },
  avatar: undefined,
  setAvatar: (newAvatar: VRM) => set(() => ({ avatar: newAvatar })),
  faceRig: null,
  setFaceRig: (newFaceRig: TFace) => set(() => ({ faceRig: newFaceRig })),
  poseRig: null,
  setPoseRig: (newPoseRig: TPose) => set(() => ({ poseRig: newPoseRig })),
  rightHandRig: null,
  setRightHandRig: (newRightHandRig: THand<'Right'>) =>
    set(() => ({ rightHandRig: newRightHandRig })),
  leftHandRig: null,
  setLeftHandRig: (newLeftHandRig: THand<'Left'>) =>
    set(() => ({ leftHandRig: newLeftHandRig })),
}));

export default useMainStore;
