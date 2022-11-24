import styled, { ThemeProvider } from 'styled-components';

import theme from '../theme';
import DraggableVideoScreen from './components/draggable-video-screen';
import useVCaptureLogic from './hooks/useVCaptureLogic';
import VideoTimeline from './components/video-timeline';
import MainScene from './scenes/main-scene';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

function App() {
  const { videoElement } = useVCaptureLogic();

  return (
    <MainContainer>
      <ThemeProvider theme={theme}>
        <DraggableVideoScreen ref={videoElement} />
        <MainScene />
        <VideoTimeline />
      </ThemeProvider>
    </MainContainer>
  );
}

export default App;
