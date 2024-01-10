import { useRef, useEffect } from "react";

const MainGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0)
    };

    image.src = "src/assets/photo-tagging-main.jpg";
  }, [canvasRef]);

  return (
    <div className="main-game">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MainGame;
