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
      </InnerDivWrapper>
    </ControllersDiv>
  );
}

export default Controllers;
