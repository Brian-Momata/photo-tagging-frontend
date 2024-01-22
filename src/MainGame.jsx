import { useRef, useEffect, useState } from "react";
import TargetingBox from "./TargetingBox";

const MainGame = () => {
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [targetingBoxCoords, setTargetingBoxCoords] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    };
    image.src = "src/assets/photo-tagging-main.jpg";
  }, []);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const boundingRect = canvas.getBoundingClientRect();

    const x = e.clientX - boundingRect.left;
    const y = e.clientY - boundingRect.top;

    setTargetingBoxCoords({ x, y });
    // Toggle the visibility of the targeting box
    setShowTargetingBox((prev) => !prev);
  };

  const onCharacterSelect = async (character, boxCoords) => {
    // Post the character, box coordinates and canvas dimensions to the backend
    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    try {
      const response = await fetch('http://localhost:3000/api/characters/tagging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character: character,
          boxCoords: boxCoords,
          canvas: { width, height}
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Tagging successful!', result);
      } else {
        console.error('Tagging failed!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-game">
      <canvas ref={canvasRef} onClick={(e) => handleClick(e)}></canvas>
      {showTargetingBox && (
        <TargetingBox left={targetingBoxCoords.x} top={targetingBoxCoords.y} onCharacterSelect={onCharacterSelect}/>
      )}
    </div>
  );
};

export default MainGame;
