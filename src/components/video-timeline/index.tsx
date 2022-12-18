import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useAnimationStore from '../../stores/useAnimationStore';
import Controllers from './controllers';
import NewProgressBar from './new-progress-bar';

const MainContainer = styled.div`
  height: 112px;
  padding: 8px 8px;
  display: flex;
  background-color: ${(props: any) => props.theme.colors.dark};
  flex-direction: column;
  align-items: center;
`;

function VideoTimeline() {
  const audioUrl = useRef<string>();
  const mode = useAnimationStore((store: any) => store.mode);
  const audioData = useAnimationStore((store) => store.audioData);

  useEffect(() => {
    const blob = new Blob(audioData, { type: 'audio/ogg; codecs=opus' });

    audioUrl.current = window.URL.createObjectURL(blob);
  }, []);

  return (
    <MainContainer>
      {audioUrl.current && <audio controls src={audioUrl.current} />}
      <NewProgressBar />
      <Controllers />
    </MainContainer>
  );
}

export default VideoTimeline;
