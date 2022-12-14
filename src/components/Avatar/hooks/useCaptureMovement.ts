import { useRef } from 'react';

/**
 * The idea here is to save the movements (poseRig, FaceRig, etc..) in a dataStructure,
 * such as a map, so they can be re-played later on the render process.
 * This is the structure of the map, the key is actually the seconds gotten with threejs clock.getElapsedTime method
 * where that pose is set,
 * and the value contains all of the poses
 * {
 *  0.0: {
 *     pose: {}
 *     face: {}
 *     leftHand: {}
 *     rightHand: {}
 *    },
 *  0.10: {...},
 *  0.25: {...}
 *  ...
 * }
 */

function useCaptureMovement() {
  const recordMovement = useRef<any>(new Map());

  return {
    recordMovement,
  };
}

export default useCaptureMovement;
