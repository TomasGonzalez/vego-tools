import styled from 'styled-components';
import {
  PauseOutline,
  PlayOutline,
  RadioButtonOffOutline,
  RadioButtonOnOutline,
} from 'react-ionicons';
import theme from '../../../../theme';
import useAnimationStore from '../../../stores/useAnimationStore';

const ControllersDiv = styled.div`
  background-color: ${(props: any) => props.theme.colors.dark};
  width: 100%;
  display: flex;
  padding: 8px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const InnerDivWrapper = styled.div`
  /* border: solid blue 1px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
`;

function Controllers() {
  const animationPlaying = useAnimationStore((store) => store.animationPlaying);
  const recording = useAnimationStore((store) => store.recording);
  return (
    <ControllersDiv>
      <InnerDivWrapper>
        {!recording ? (
          <RadioButtonOffOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
          />
        ) : (
          <RadioButtonOnOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
          />
        )}
        {!animationPlaying ? (
          <PlayOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
          />
        ) : (
          <PauseOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
          />
        )}
      </InnerDivWrapper>
    </ControllersDiv>
  );
}

export default Controllers;
