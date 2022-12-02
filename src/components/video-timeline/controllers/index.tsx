import styled from 'styled-components';
import {
  ImageOutline,
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
  width: 100px;
`;

const Spinner = styled.div`
  border-radius: 10px;
  height: 10px;
  width: 10px;
  border: 3px solid ${(props) => props.theme.colors.third}; /* Light grey */
  border-top: 3px solid ${(props) => props.theme.colors.primary}; /* Blue */
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Controllers() {
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);

  return (
    <ControllersDiv>
      <InnerDivWrapper>
        {mode === 'recording' ? (
          <RadioButtonOnOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            onClick={() => setMode('default')}
          />
        ) : (
          <RadioButtonOffOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            onClick={() => setMode('recording')}
          />
        )}

        {mode === 'playing' ? (
          <PauseOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            onClick={() => setMode('default')}
          />
        ) : (
          <PlayOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            onClick={() => setMode('playing')}
          />
        )}

        {mode === 'rendering' ? (
          <Spinner />
        ) : (
          <ImageOutline
            color={theme.colors.primary}
            style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            onClick={() => setMode('rendering')}
          />
        )}
      </InnerDivWrapper>
    </ControllersDiv>
  );
}

export default Controllers;
