import create from 'zustand';
import config from '../../constants/config';

/*
 *  Mode should go into another store,
 *  one for the editor's general settings, but for now It stays here.
 */

type TMode =
  | 'default'
  | 'recording'
  | 'playing'
  | 'prep-render'
  | 'rendering'
  | 'render-results'
  | 'preparing' // preparing the AI model for recording
  | 'ready'; // AI model is ready now you can record whenever

interface TAState {
  timeLimit: number;
  step: number;
  currentTime: number;
  setCurrentTime: (newTime: number) => void;
  animationRecordTime: number;
  setAnimationRecordTime: (newATLimit: number) => void;
  audioData: any[];
  pushAudioChunks: (newAudioData: any) => void;
  setTimeNextFrame: () => void;
  addTime: (timeDelta: number) => void;
  mode: TMode;
  setMode: (newMode: TMode) => void;
  renderBlob: undefined | string;
  setRenderBlob: (newRenderBlob: string | undefined) => void;
}

const useAnimationStore = create<TAState>()((set, get) => ({
  timeLimit: config.maxRecordingTime,
  step: 0.001,
  currentTime: 0,
  animationRecordTime: 0,
  audioData: [],
  pushAudioChunks: (newAudioData: any) =>
    set(() => ({
      audioData: [...get().audioData, newAudioData],
    })),
  setAnimationRecordTime: (newATLimit) =>
    set(() => ({ animationRecordTime: newATLimit })),
  setCurrentTime: (newTime: number) => set(() => ({ currentTime: newTime })),
  setTimeNextFrame: () =>
    set(() => ({ currentTime: get().currentTime + 1 / config.renderFPS })), // 1 is the frame per second
  addTime: (timeDelta) =>
    set(() => ({
      currentTime: (timeDelta + get().currentTime) % get().timeLimit,
    })),
  mode: 'default',
  setMode: (newMode) => set({ mode: newMode }),
  renderBlob: undefined,
  setRenderBlob: (newRenderBlob) => set({ renderBlob: newRenderBlob }),
}));

export default useAnimationStore;
