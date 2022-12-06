import { useMemo, useState } from 'react';
import styled from 'styled-components';

function NewProgressBar() {
  const [min, setMinValue] = useState(0);
  const [max, setMaxValue] = useState(1);

  const calculateIntervals = useMemo(() => {
    const increment = (max - min) / 10;

    return Array.from(
      { length: (max - min) / increment + 1 },
      (_, i) => min + i * increment
    );
  }, [max, min]);

  return (
    <MainWrapper
      onMouseDownCapture={(e) => console.log(e.movementX)}
      onWheel={(e) => {
        console.log(e);
        setMaxValue((value) => e.deltaY + value);
      }}
    >
      {calculateIntervals.map((value) => {
        return <div>{value.toFixed(2)}</div>;
      })}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  border: 1px solid red;
  cursor: pointer;
`;

export default NewProgressBar;
