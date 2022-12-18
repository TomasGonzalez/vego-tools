import { useRef, useEffect, useState } from 'react';

import useAnimationStore from '../../../stores/useAnimationStore';

function useHandleAudio() {
  const stream = useRef<any>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const pushAudioChunks = useAnimationStore((store) => store.pushAudioChunks);
  const mode = useAnimationStore<any>((store) => store.mode);

  useEffect(() => {
    if (
      mode === 'preparing' &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    ) {
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          }
        )
        // Success callback
        .then((_stream) => {
          stream.current = _stream;
          setMediaRecorder(() => {
            const _mediaRecorder = new MediaRecorder(_stream);
            _mediaRecorder.ondataavailable = (e) => {
              pushAudioChunks(e.data);
              console.log('a new blob of data was setted');
            };
            return _mediaRecorder;
          });
        })

        // Error callback
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    }

    if (mode === 'recording') {
      mediaRecorder?.start();
    }

    if (
      !['preparing', 'recording', 'ready'].includes(mode) &&
      stream.current &&
      mediaRecorder?.state === 'recording'
    ) {
      mediaRecorder?.stop();
      stream.current.getTracks().forEach((track: any) => {
        track.stop();
      });
    }
  }, [mode, mediaRecorder]);
}

export default useHandleAudio;
