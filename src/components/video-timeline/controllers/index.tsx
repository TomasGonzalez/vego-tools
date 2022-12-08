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

function Controllers() {
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);

  return (
    <ControllersDiv>
      <InnerDivWrapper>
        <IconContaier
          onClick={() =>
            setMode(mode === 'recording' ? 'default' : 'recording')
          }
        >
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
        </IconContaier>

        <IconContaier
          onClick={() => setMode(mode === 'playing' ? 'default' : 'playing')}
        >
          {mode === 'playing' ? (
            <PauseOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            />
          ) : (
            <PlayOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            />
          )}
        </IconContaier>
        <IconContaier
          disabled={mode === 'rendering'}
          onClick={() => setMode('rendering')}
        >
          {mode === 'rendering' ? (
            <Spinner />
          ) : (
            <ImageOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle', cursor: 'pointer' }}
            />
          )}
        </IconContaier>
      </InnerDivWrapper>
    </ControllersDiv>
  );
}

const IconContaier = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  padding: 0px;
  margin: 0px;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

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

export default Controllers;
