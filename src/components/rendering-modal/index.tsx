import styled from 'styled-components';
import Modal from 'styled-react-modal';

import useAnimationStore from '../../stores/useAnimationStore';
import Button from '../button';

function RenderingModal() {
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);

  const container =
    mode === 'rendering' ? (
      <ModalContainer>Loading...</ModalContainer>
    ) : (
      <ModalContainer>
        <Button onClick={() => setMode('default')}> Cancel </Button>
        <Button onClick={() => setMode('rendering')}>Start rendering</Button>
      </ModalContainer>
    );

  return (
    <StyledModal
      isOpen={['prep-render', 'rendering', 'render-results'].includes(mode)}
      onBackgroundClick={() => setMode('default')}
    >
      {container}
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

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default RenderingModal;
