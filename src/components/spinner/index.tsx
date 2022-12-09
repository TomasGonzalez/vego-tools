import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ size?: string }>`
  animation: ${rotate} 1s linear infinite;
  border: 2px solid ${(props) => props.theme.colors.dark};
  border-radius: 50%;
  border-top-color: ${(props) => props.theme.colors.primary};
  width: ${(props) => props.size || '1em'};
  height: ${(props) => props.size || '1em'};
`;

function LoadingSpinner<T>({ size }: { size?: string } & T) {
  return <Spinner size={size} />;
}

export default LoadingSpinner;
