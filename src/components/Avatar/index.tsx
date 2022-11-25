import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useControls } from 'leva';
import { Clock } from 'three';

import useMainStore from '../../stores/useCharacterStore';
import useHandleMovement from './hooks/useHandleMovement';

export type TMode = 'record' | 'play';

const Avatar = ({ modelUrl }: { modelUrl: string }) => {
  const { scene } = useThree();
  const setAvatar = useMainStore(({ setAvatar }) => setAvatar);
  const avatar = useMainStore(({ avatar }) => avatar);
  const loader = useRef(new GLTFLoader());

  const [mode, setMode] = useState<TMode>('play');

  //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv <- that could be it's own hook
  // Each avatar must have its own clock in order to know how many seconds of recording it has

  const clock = useRef(new Clock(false));
  const recordingTime = useRef(0);

  const { isAvatarPlaying } = useControls({
    isAvatarPlaying: true,
  });

  useEffect(() => {
    setMode(isAvatarPlaying ? 'play' : 'record');
    if (!isAvatarPlaying) {
      clock.current.start();
    } else {
      recordingTime.current += clock.current.getElapsedTime();
      console.log(recordingTime.current, 'current recording time');
      clock.current.stop();
    }
  }, [isAvatarPlaying]);

  //^^^^^^^^^^^^^^^^^^^^^

  //Avatar movement recorder
  useHandleMovement(mode, recordingTime);

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
