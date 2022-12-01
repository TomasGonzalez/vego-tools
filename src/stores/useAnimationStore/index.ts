import create from 'zustand';
import config from '../../constants/config';

type TMode = 'default' | 'recording' | 'playing' | 'rendering';

interface TAState {
  timeLimit: number;
  step: number;
  currentTime: number;
  setCurrentTime: (newTime: number) => void;
  addTime: (timeDelta: number) => void;
  mode: TMode;
  setMode: (newMode: TMode) => void;
}

const useAnimationStore = create<TAState>()((set, get) => ({
  timeLimit: config.maxRecordingTime,
  step: 0.001,
  currentTime: 0,
  setCurrentTime: (newTime: number) => set(() => ({ currentTime: newTime })),
  addTime: (timeDelta) =>
    set(() => ({
      currentTime: (timeDelta + get().currentTime) % get().timeLimit,
    })),
  mode: 'default',
  setMode: (newMode) => set({ mode: newMode }),
}));

export default useAnimationStore;
