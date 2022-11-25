import styled from 'styled-components';
import ProgressBar from './progress-bar';

const MainContainer = styled.div`
  height: 100px;
  padding: 8px 8px;
  display: flex;
  background-color: ${(props: any) => props.theme.colors.dark};
  flex-direction: column;
  align-items: center;
`;

const ControllersDiv = styled.div`
  background-color: ${(props: any) => props.theme.colors.dark};
  width: 100%;
  margin: 4px;
  border-radius: 4px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function VideoTimeline() {
  return (
    <MainContainer>
      <ProgressBar />
      <ControllersDiv>
        <div> time O {'>'} </div>
      </ControllersDiv>
    </MainContainer>
  );
}

export default VideoTimeline;
