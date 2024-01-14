import { useRef, useEffect, useState } from "react";
import TargetingBox from "./TargetingBox";

const MainGame = () => {
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [targetingBoxCoords, setTargetingBoxCoords] = useState({ x: 0, y: 0 });
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
  
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const boundingRect = canvas.getBoundingClientRect();

    const x = e.clientX - boundingRect.left;
    const y = e.clientY - boundingRect.top;

    setTargetingBoxCoords({ x, y });
    // Toggle the visibility of the targeting box
    setShowTargetingBox((prev) => !prev);
  };

  return (
    <div className="main-game">
      <canvas ref={canvasRef} onClick={(e) => handleClick(e)}></canvas>
      {showTargetingBox && (
        <TargetingBox left={targetingBoxCoords.x} top={targetingBoxCoords.y}/>
      )}
    </div>
  );
};

export default MainGame;
