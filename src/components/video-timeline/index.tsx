import styled from 'styled-components';
import Controllers from './controllers';
import ProgressBar from './progress-bar';

const MainContainer = styled.div`
  height: 100px;
  padding: 8px 8px;
  display: flex;
  background-color: ${(props: any) => props.theme.colors.dark};
  flex-direction: column;
  align-items: center;
`;
function VideoTimeline() {
  return (
    <MainContainer>
      <ProgressBar />
      <Controllers />
    </MainContainer>
  );
}

export default VideoTimeline;
