import React, { useRef, useEffect  } from 'react';
import Generator from "../geometry/generator";

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

    var generator = new Generator(context, width, height);
    generator.generate();
  }, [])

  return <canvas
    ref={canvasRef}
    height={height}
    width={width}
    />
}

Canvas.defaultProps = {

width: window.innerWidth,

height: window.innerHeight,

};

export default Canvas
