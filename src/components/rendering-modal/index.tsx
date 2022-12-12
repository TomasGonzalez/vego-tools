import styled from 'styled-components';
import Modal from 'styled-react-modal';

import useAnimationStore from '../../stores/useAnimationStore';
import Button from '../button';
import LoadingSpinner from '../spinner';

function RenderingModal() {
  const renderBlob = useAnimationStore((store) => store.renderBlob);
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);

  let container = <LoadingSpinner />;

  if (mode === 'prep-render') {
    container = (
      <ModalContainer>
        <Button onClick={() => setMode('default')}> Cancel </Button>
        <Button onClick={() => setMode('rendering')}>Start rendering</Button>
      </ModalContainer>
    );
  }

  if (mode === 'render-results') {
    container = (
      <ModalContainer>
        <DownloadClip href={renderBlob} download='My Animation.webm'>
          Download your animation
        </DownloadClip>
      </ModalContainer>
    );
  }

  return (
    <StyledModal
      isOpen={['prep-render', 'rendering', 'render-results'].includes(mode)}
      onBackgroundClick={() => setMode('default')}
    >
      {container}
    </StyledModal>
  );
}

const DownloadClip = styled.a`
  color: ${(props) => props.theme.colors.primary};
  padding: 8px;
  background-color: ${(props) => props.theme.colors.third};
  border-radius: 4px;
`;

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
