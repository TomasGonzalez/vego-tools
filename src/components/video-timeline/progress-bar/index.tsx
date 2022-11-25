import { useRef } from 'react';

import styled from 'styled-components';
import './index.css';

const ProgressBarDiv = styled.div`
  /* background-color: ${(props: any) => props.theme.colors.third}; */
  width: 100%;
  /* margin: 4px; */
  border-radius: 4px;
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
`;

const InputRangeContainer = styled.input``;

function ProgressBar() {
  const sliderValue = useRef<number>(0);
  return (
    <ProgressBarDiv>
      <InputRangeContainer
        onInput={(e: any) => (sliderValue.current = parseInt(e.target.value))}
        type={'range'}
        min='0'
        step='1'
        max='100'
      />
    </ProgressBarDiv>
  );
}

export default ProgressBar;
