import { useRef } from 'react';

/**
 * The idea here is to save the movements (poseRig, FaceRig, etc..) in a dataStructure,
 * such as an array or nodelist, so they can be re-played later on on the reder process.
 */

function useCaptureMovement() {
  const recordPoseMovement = useRef<any>([]); // here is the movement of the character will be captured
  const recordFaceMovement = useRef<any>([]); // here is the movement of the character will be captured
  const recordLeftHandMovement = useRef<any>([]); // here is the movement of the character will be captured
  const recordRightHandMovement = useRef<any>([]); // here is the movement of the character will be captured

  return {
    recordPoseMovement,
    recordFaceMovement,
    recordLeftHandMovement,
    recordRightHandMovement,
  };
}

export default useCaptureMovement;
