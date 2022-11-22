import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import useUpdateFace from './hooks/useUpdateFace';
import useUpdatePose from './hooks/useUpdatePose';
import useUpdateHands from './hooks/useUpdateHands';

import useMainStore from '../../stores/useMainStore';
import useCaptureMovement from './hooks/useCaptureMovement';

export type TMode = 'record' | 'play';

const Avatar = ({ modelUrl }: { modelUrl: string }) => {
  const { scene } = useThree();
  const setAvatar = useMainStore(({ setAvatar }) => setAvatar);
  const avatar = useMainStore(({ avatar }) => avatar);
  const loader = useRef(new GLTFLoader());
  const [mode, setMode] = useState<TMode>('record');

  //Avatar movement recorder
  const { recordPoseMovement, recordFaceMovement, recordHandsMovement } =
    useCaptureMovement();

  //Avatar VRM updater
  useUpdatePose(recordPoseMovement, mode);
  useUpdateFace(recordFaceMovement);
  useUpdateHands(recordHandsMovement);

  useFrame(({}, delta) => {
    avatar?.update(delta);
  });

  useEffect(() => {
    loader.current.register((parser: any) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.current.load(
      modelUrl,
      (gltf: any) => {
        const vrm = gltf.userData.vrm;
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.removeUnnecessaryJoints(gltf.scene);
        setAvatar(vrm);
      },
      (progress: any) =>
        console.log(
          'Loading model...',
          100.0 * (progress.loaded / progress.total),
          '%'
        ),
      (error: any) => console.error(error)
    );
  }, [scene, setAvatar]);

  if (avatar)
    return (
      <primitive rotation={[0, Math.PI, 0]} object={avatar?.scene}></primitive>
    );

  return null;
};

export default Avatar;
