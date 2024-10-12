import { useEffect, useRef } from "react";
import { CANVAS_HEIGHT_PX, CANVAS_WIDTH_PX } from "./constants";

const WhiteNoise = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }

    const rafCb = () => {
      const imageData = context.createImageData(
        CANVAS_WIDTH_PX,
        CANVAS_HEIGHT_PX
      );
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const grayValue = Math.random() * 255;
        data[i] = grayValue;
        data[i + 1] = grayValue;
        data[i + 2] = grayValue;
        data[i + 3] = 255;
      }

      context.putImageData(imageData, 0, 0);

      requestAnimationFrame(rafCb);
    };

    requestAnimationFrame(rafCb);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <h1 className="py-5 text-center text-3xl font-extrabold">White Noise</h1>
      <div className="flex flex-grow justify-center items-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH_PX}
          height={CANVAS_HEIGHT_PX}
        />
      </div>
    </div>
  );
};

export default WhiteNoise;
