import { useRef } from 'react';

/**
 * The idea here is to save the movements (poseRig, FaceRig, etc..) in a dataStructure,
 * such as an array or nodelist, so they can be re-played later on on the reder process.
 */

function useCaptureMovement() {
  const recordPoseMovement = useRef([]); // here is the movement of the character will be captured
  const recordFaceMovement = useRef([]); // here is the movement of the character will be captured
  const recordHandsMovement = useRef([]); // here is the movement of the character will be captured

  return { recordPoseMovement, recordFaceMovement, recordHandsMovement };
}

export default useCaptureMovement;
