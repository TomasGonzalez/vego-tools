import { useRef } from 'react';

function useRenderScene() {
  const canvasRef = useRef<any>();

  return { canvasRef };
}

export default useRenderScene;
