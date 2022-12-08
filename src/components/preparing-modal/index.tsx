import Modal from 'styled-react-modal';

import useAnimationStore from '../../stores/useAnimationStore';
import Spinner from '../spinner';

const StyledModal = Modal.styled`
  min-width: 20rem;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props: any) => props.theme.colors.dark};
  border-radius: 10px; 
`;

function PreparingCameraModal() {
  const setMode = useAnimationStore((store) => store.setMode);
  const mode = useAnimationStore((store) => store.mode);
  return (
    <StyledModal isOpen={mode === 'preparing'}>
      <Spinner size={'50px'} />
      <p>Loading motion tracking model...</p>
    </StyledModal>
  );
}

export default PreparingCameraModal;
