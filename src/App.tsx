import styled, { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'styled-react-modal';

import theme from '../theme';
import DraggableVideoScreen from './components/draggable-video-screen';
import VideoTimeline from './components/video-timeline';
import MainScene from './scenes/main-scene';
import PreparingCameraModal from './components/preparing-modal';
import useKalidokit from './hooks/useKalidokit';

function App() {
  const { videoElement } = useKalidokit();

  return (
    <MainContainer>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <DraggableVideoScreen ref={videoElement} />
          <MainScene />
          <VideoTimeline />
          <PreparingCameraModal />
        </ModalProvider>
      </ThemeProvider>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export default App;
