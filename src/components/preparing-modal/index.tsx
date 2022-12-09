import styled from 'styled-components';
import Modal from 'styled-react-modal';

import useAnimationStore from '../../stores/useAnimationStore';
import Button from '../button';
import Spinner from '../spinner';

function PreparingCameraModal() {
  const setMode = useAnimationStore((store) => store.setMode);
  const mode = useAnimationStore((store) => store.mode);

  return (
    <StyledModal isOpen={['preparing', 'ready'].includes(mode)}>
      {mode === 'preparing' ? (
        <LoaderContainer>
          <Spinner size={'50px'} />
          <p>Loading motion tracking model...</p>
        </LoaderContainer>
      ) : (
        <ModalContainer>
          <Button onClick={() => setMode('default')}>Cancel</Button>
          <Button onClick={() => setMode('recording')}>Start Recording</Button>
        </ModalContainer>
      )}
    </StyledModal>
  );
}

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 8px;
  padding: 16px;
  background-color: ${(props: any) => props.theme.colors.dark};
`;

const LoaderContainer = styled(ModalContainer)`
  flex-direction: column;
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default PreparingCameraModal;
