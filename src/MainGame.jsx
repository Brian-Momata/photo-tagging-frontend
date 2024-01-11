import { useRef, useEffect } from "react";

const MainGame = () => {
  const canvasRef = useRef(null);

  const characters = {
    "Washington Carver": { ratio: [7.75, 64.90], coords: [] },
    "Einstein": { ratio: [13.93, 38.70], coords: [] },
    "Curie": { ratio: [30.55, 75.59], coords: [] },
    "Newton": { ratio: [91.84, 87.63], coords: [] },
    "Ride": { ratio: [57.66, 34.17], coords: [] },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Calculate coordinates based on ratios and canvas size
      Object.keys(characters).forEach((character) => {
        const [xRatio, yRatio] = characters[character].ratio;
        const xCoord = (xRatio / 100) * canvas.clientWidth;
        const yCoord = (yRatio / 100) * canvas.clientHeight;

        characters[character].coords = [xCoord, yCoord];
      });
    };
    image.src = "src/assets/photo-tagging-main.jpg";
  });

  const handleClick = (event) => {
    // I'm using this to confirm location of the characters
    const bounding = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
  };

  return (
    <div className="main-game">
      <canvas ref={canvasRef} onClick={(e) => handleClick(e)}></canvas>
    </div>
  );
};

export default MainGame;
