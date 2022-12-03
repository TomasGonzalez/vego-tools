import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock } from 'three';

import useMainStore from '../../stores/useCharacterStore';
import useHandleMovement from './hooks/useHandleMovement';
import useAnimationStore from '../../stores/useAnimationStore';

export type TMode = 'record' | 'play';

const Avatar = ({ modelUrl }: { modelUrl: string }) => {
  const { scene } = useThree();
  const setAvatar = useMainStore(({ setAvatar }) => setAvatar);
  const avatar = useMainStore(({ avatar }) => avatar);
  const loader = useRef(new GLTFLoader());
  const mode = useAnimationStore((store) => store.mode);

  /*
   * Each avatar must have its own clock,
   * in order to track its current recording time.
   */

  const clock = useRef(new Clock(false));

  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    if (useAnimationStore.getState().animationTimeLimit < recordingTime) {
      useAnimationStore.getState().setAnimationTimeLimit(recordingTime);
    }
  }, [recordingTime]);

  useEffect(() => {
    switch (mode) {
      case 'recording':
        useAnimationStore.getState().setCurrentTime(recordingTime);
        clock.current.start();
        break;
      case 'playing':
      case 'default':
        //Add the recording time and stop the clock when recordingStops
        if (clock.current.running) {
          setRecordingTime(
            (_recordingTime) => clock.current.getElapsedTime() + _recordingTime
          );
          clock.current.stop();
        }
        break;
    }
  }, [mode]);

  useHandleMovement(mode, recordingTime);

  useFrame(({}, delta) => {
    if (useAnimationStore.getState().mode === 'recording')
      useAnimationStore.getState().addTime(clock.current.getDelta());
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
