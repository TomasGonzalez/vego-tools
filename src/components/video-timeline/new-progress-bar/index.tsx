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
    <MainWrapper>
      <div>0</div>
      {calculateIntervals.map((value) => {
        return <div>{value.toFixed(2)}</div>;
      })}
      <div>1</div>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default NewProgressBar;
