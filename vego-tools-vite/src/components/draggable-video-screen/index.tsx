import { forwardRef, useRef } from 'react';

const DraggableVideoScreen = forwardRef(function DraggableVideoScreen(
  {},
  ref: any // this gives a warning when asking for current  Ref<[HTMLVideoElement]>
) {
  const mainRef = useRef<any>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const offset = useRef([0, 0]);
  const isMousePressed = useRef(false);

  return (
    <div
      ref={mainRef}
      onMouseDown={(e) => {
        isMousePressed.current = true;
        offset.current = [
          mainRef.current.offsetLeft - e.clientX,
          mainRef.current.offsetTop - e.clientY,
        ];
      }}
      onMouseUp={() => {
        isMousePressed.current = false;
      }}
      onMouseMove={(e) => {
        if (ref && isMousePressed.current) {
          mousePosition.current = {
            x: e.clientX,
            y: e.clientY,
          };
          mainRef.current.style.left =
            mousePosition.current.x + offset.current[0] + 'px';
          mainRef.current.style.top =
            mousePosition.current.y + offset.current[1] + 'px';
        }
      }}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '200px',
        zIndex: 100,
        cursor: 'pointer',
        transform: 'rotateY(180deg)',
        borderRadius: 5,
      }}
    >
      <video
        ref={ref}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '200px',
          zIndex: 100,
          cursor: 'pointer',
          borderRadius: 5,
          opacity: 1,
        }}
        className='video'
      />
      <canvas
        style={{
          position: 'absolute',
          zIndex: 121,
          width: 200,
          height: 135,
        }}
        id='guides'
      />
    </div>
  );
});

export default DraggableVideoScreen;
