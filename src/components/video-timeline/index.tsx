import styled from 'styled-components';

const MainContainer = styled.div`
  height: 100px;
  padding: 8px;
  display: flex;
  background-color: ${(props: any) => props.theme.colors.dark};
  flex-direction: column;
  align-items: center;
`;

const ProgressBarDiv = styled.div`
  background-color: ${(props: any) => props.theme.colors.third};
  width: 100%;
  margin: 4px;
  border-radius: 4px;
  display: flex;
  flex: 2;
  justify-content: center;
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
      <ProgressBarDiv>
        <div>test</div>
      </ProgressBarDiv>
      <ControllersDiv>
        <div> time O {'>'} </div>
      </ControllersDiv>
    </MainContainer>
  );
}

export default VideoTimeline;
