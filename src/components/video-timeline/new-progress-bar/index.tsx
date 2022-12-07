import { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useAnimationStore from '../../../stores/useAnimationStore';

function NewProgressBar() {
  const timeLimit = useAnimationStore((store) => store.timeLimit);
  const currentTime = useAnimationStore((store) => store.currentTime);
  const setCurrentTime = useAnimationStore((store) => store.setCurrentTime);
  const [max, setMaxValue] = useState(timeLimit);
  const [min, setMinValue] = useState(0);
  const positionDelta = useRef(0);
  const timelineContaienrRef = useRef<any>(null);

  const calculateIntervals = useMemo(() => {
    const increment = (max - min) / 10;

    return Array.from(
      { length: (max - min) / increment + 1 },
      (_, i) => min + i * increment
    );
  }, [max, min]);

  const mouseMove = useCallback((e: any) => {
    const { clientX } = e;
    if (e.buttons === 1) {
      const rect = timelineContaienrRef?.current?.getBoundingClientRect();

      // Calculate the position of the mouse relative to the element
      const x = clientX - rect.left;

      positionDelta.current = x / timelineContaienrRef.current.offsetWidth;

      setCurrentTime(positionDelta.current * max);
    }
  }, []);

  const wheel = useCallback((e: any) => {
    setMaxValue((value) => e.deltaY + value);
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <NumbersContainer>
        {calculateIntervals.map((value) => (
          <NumericPointers key={value}>{value.toFixed(2)}</NumericPointers>
        ))}
      </NumbersContainer>
      <MainWrapper
        ref={timelineContaienrRef}
        onMouseMove={mouseMove}
        // onWheel={wheel}
      >
        <CursorMarker positionDelta={currentTime / max} />
      </MainWrapper>
    </div>
  );
}

const NumbersContainer = styled.div`
  background-color: ${(props) => props.theme.colors.third};
  display: flex;
  justify-content: space-between;
`;

const NumericPointers = styled.div`
  font-size: 12px;
  user-select: none;
  z-index: 1;
`;

const CursorMarker = styled.div<any>`
  background-color: ${(props) => props.theme.colors.primary};
  height: 100%;
  width: 1px;
  left: ${(props) => props.positionDelta * 100}%;
  position: absolute;
`;

const MainWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 40px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  cursor: pointer;
`;

export default NewProgressBar;
