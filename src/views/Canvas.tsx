import React, { useRef, useEffect  } from 'react';
import Drawer from "../geometry/drawer";
import {ReactComponent  as Goo} from "../svg/goo.svg";

interface CanvasProps {

width: number;

height: number;

}

const Canvas = ({ width, height }: CanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasFilterRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error('Could not get canvas');

    const context = canvas.getContext('2d');
    if (context == null) throw new Error('Could not get context');

    const canvasFilter = canvasFilterRef.current;
    if (canvasFilter == null) throw new Error('Could not get canvas');

    const filterContext = canvasFilter.getContext('2d');
    if (filterContext == null) throw new Error('Could not get context');

    var drawer = new Drawer({
      ctx: context,
      filterCtx: filterContext,
      width: width,
      height: height
    });
    drawer.start();
  }, [width, height])

  return <>
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "-5",
        //filter: "url('#goo')",
      }}
    />
    <canvas
      ref={canvasFilterRef}
      height={height}
      width={width}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "-5",
        WebkitFilter: "url('#goo')",
      	filter: "url('#goo')",
      }}
    />
    <Goo/>
  </>
}

Canvas.defaultProps = {

width: window.innerWidth,

height: window.innerHeight,

};

export default Canvas
