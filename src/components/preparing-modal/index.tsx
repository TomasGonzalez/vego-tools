import Modal from 'styled-react-modal';

import useAnimationStore from '../../stores/useAnimationStore';

const StyledModal = Modal.styled`
  min-width: 20rem;
  min-height: 20rem;
  display: flex;
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
      <div>test</div>
    </StyledModal>
  );
}

export default PreparingCameraModal;
