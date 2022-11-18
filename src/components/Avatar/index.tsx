import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import useUpdateFace from './hooks/useUpdateFace';
import useUpdatePose from './hooks/useUpdatePose';
import useUpdateHands from './hooks/useUpdateHands';

import useMainStore from '../../stores/useMainStore';

const Avatar = () => {
  const { scene } = useThree();
  const setAvatar = useMainStore(({ setAvatar }) => setAvatar);
  const avatar = useMainStore(({ avatar }) => avatar);
  const loader = useRef(new GLTFLoader());

  useUpdateFace();
  useUpdatePose();
  useUpdateHands();

  useFrame(({}, delta) => {
    avatar?.update(delta);
  });

  useEffect(() => {
    loader.current.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.current.load(
      '/3d-models/vrm-characters/power.vrm',
      (gltf) => {
        const vrm = gltf.userData.vrm;
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.removeUnnecessaryJoints(gltf.scene);
        setAvatar(vrm);
      },
      (progress) =>
        console.log(
          'Loading model...',
          100.0 * (progress.loaded / progress.total),
          '%'
        ),
      (error) => console.error(error)
    );
  }, [scene, setAvatar]);

  if (avatar)
    return (
      <primitive rotation={[0, Math.PI, 0]} object={avatar?.scene}></primitive>
    );

  return null;
};

export default Avatar;
