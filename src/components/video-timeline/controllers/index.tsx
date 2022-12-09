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
import Spinner from '../../spinner';

function Controllers() {
  const mode = useAnimationStore((store) => store.mode);
  const setMode = useAnimationStore((store) => store.setMode);

  return (
    <ControllersDiv>
      <InnerDivWrapper>
        <IconContaier
          onClick={() =>
            setMode(mode === 'recording' ? 'default' : 'preparing')
          }
        >
          {mode === 'recording' ? (
            <RadioButtonOnOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle' }}
            />
          ) : (
            <RadioButtonOffOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle' }}
            />
          )}
        </IconContaier>

        <IconContaier
          onClick={() => setMode(mode === 'playing' ? 'default' : 'playing')}
        >
          {mode === 'playing' ? (
            <PauseOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle' }}
            />
          ) : (
            <PlayOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle' }}
            />
          )}
        </IconContaier>

        <IconContaier
          disabled={mode === 'rendering'}
          onClick={() => setMode('prep-render')}
        >
          {mode === 'rendering' ? (
            <Spinner />
          ) : (
            <ImageOutline
              color={theme.colors.primary}
              style={{ verticalAlign: 'middle' }}
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

export default Controllers;
