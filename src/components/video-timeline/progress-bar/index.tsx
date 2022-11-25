import useAnimationStore from '../../../stores/useAnimationStore';
import styled from 'styled-components';

function ProgressBar() {
  return (
    <ProgressBarDiv>
      <InputRangeContainer
        type={'range'}
        onInput={(e: any) =>
          useAnimationStore.getState().setCurrentTime(parseInt(e.target.value))
        }
        min={0}
        step={useAnimationStore.getState().step}
        max={useAnimationStore.getState().timeLimit}
      />
    </ProgressBarDiv>
  );
}

const ProgressBarDiv = styled.div`
  background-color: ${(props: any) => props.theme.colors.third};
  width: 100%;
  border-radius: 0px;
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
`;

const InputRangeContainer = styled.input`
  -webkit-appearance: none;
  width: 100%;

  &:focus {
    &::-ms-fill-upper {
      background: #50555c;
    }

    &::-webkit-slider-runnable-track {
      background: #50555c;
    }

    &::-ms-fill-lower {
      background: #50555c;
    }

    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 50px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #50555c;
    background: #50555c;
    border-radius: 1px;
    border: 0px solid #000000;
  }

  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 50px;
    width: 1px;
    border-radius: 0px;
    background: #ff0808;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: 0px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 30px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #50555c;
    background: #50555c;
    border-radius: 1px;
    border: 0px solid #000000;
  }

  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 50px;
    width: 1px;
    border-radius: 0px;
    background: #ff0808;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 30px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: #50555c;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #50555c;
  }

  &::-ms-fill-upper {
    background: #50555c;
    border: 0px solid #000000;
    border-radius: 2px;
    box-shadow: 0px 0px 0px #50555c;
  }

  &::-ms-thumb {
    margin-top: 1px;
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 50px;
    width: 1px;
    border-radius: 0px;
    background: #ff0808;
    cursor: pointer;
  }
`;

export default ProgressBar;
