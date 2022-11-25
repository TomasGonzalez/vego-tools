import create from 'zustand';
import config from '../../constants/config';

interface TAState {
  timeLimit: number;
  step: number;
  currentTime: number;
  setCurrentTime: (newTime: number) => void;
  addTime: (timeDelta: number) => void;
  animationPlaying: boolean;
  setAnimationPlaying: (newPlayingValue: boolean) => void;
}

const useAnimationStore = create<TAState>()((set, get) => ({
  timeLimit: config.maxRecordingTime,
  step: 0.1,
  currentTime: 0,
  setCurrentTime: (newTime: number) => set(() => ({ currentTime: newTime })),
  addTime: (timeDelta) =>
    set(() => ({ currentTime: timeDelta + get().currentTime })),
  animationPlaying: false,
  setAnimationPlaying: (newPlayingValue: boolean) =>
    set(() => ({ animationPlaying: newPlayingValue })),
}));

export default useAnimationStore;
