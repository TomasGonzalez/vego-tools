import create from 'zustand';
import config from '../../constants/config';

type TMode = 'default' | 'recording' | 'playing' | 'rendering';

interface TAState {
  timeLimit: number;
  step: number;
  currentTime: number;
  setCurrentTime: (newTime: number) => void;
  animationTimeLimit: number;
  setAnimationTimeLimit: (newATLimit: number) => void;
  setTimeNextFrame: () => void;
  addTime: (timeDelta: number) => void;
  mode: TMode;
  setMode: (newMode: TMode) => void;
}

const useAnimationStore = create<TAState>()((set, get) => ({
  timeLimit: config.maxRecordingTime,
  step: 0.001,
  currentTime: 0,
  animationTimeLimit: 0,
  setAnimationTimeLimit: (newATLimit) =>
    set(() => ({ animationTimeLimit: newATLimit })),
  setCurrentTime: (newTime: number) => set(() => ({ currentTime: newTime })),
  setTimeNextFrame: () =>
    set(() => ({ currentTime: get().currentTime + config.renderFPS })),
  addTime: (timeDelta) =>
    set(() => ({
      currentTime: (timeDelta + get().currentTime) % get().timeLimit,
    })),
  mode: 'default',
  setMode: (newMode) => set({ mode: newMode }),
}));

export default useAnimationStore;
