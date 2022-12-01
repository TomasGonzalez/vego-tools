import { useRef, useEffect } from 'react';

function useRenderScene() {
  const canvasRef = useRef<any>();

  useEffect(() => {
    console.log(canvasRef, 'this is canvas ref');
  }, [canvasRef.current]);

  return { canvasRef };
}

export default useRenderScene;
