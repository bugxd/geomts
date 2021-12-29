import React, { useRef, useEffect  } from 'react';
import Drawer from "../geometry/drawer";

interface CanvasProps {

width: number;

height: number;

}

const Canvas = ({ width, height }: CanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error('Could not get canvas');

    const context = canvas.getContext('2d');
    if (context == null) throw new Error('Could not get context');

    var drawer = new Drawer(context, width, height);
    drawer.start();
  }, [width, height])

  return <canvas
    ref={canvasRef}
    height={height}
    width={width}
    style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "-4",
        opacity: 1,
      }}
    />
}

Canvas.defaultProps = {

width: window.innerWidth,

height: window.innerHeight,

};

export default Canvas
