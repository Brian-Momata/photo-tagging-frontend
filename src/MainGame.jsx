import { useRef, useEffect, useState } from "react";
import TargetingBox from "./TargetingBox";

const MainGame = () => {
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [targetingBoxCoords, setTargetingBoxCoords] = useState({ x: 0, y: 0 });
  const [characters, setCharacters] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:3000/api/characters/index');
        let data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    if (characters) {
      const canvas = canvasRef.current;
     
      // Calculate coordinates based on ratios and canvas size
      Object.keys(characters).forEach((character) => {
        const [xRatio, yRatio] = characters[character].ratio;
        const xCoord = (xRatio / 100) * canvas.clientWidth;
        const yCoord = (yRatio / 100) * canvas.clientHeight;

        characters[character].coords = [xCoord, yCoord];
      });
    }
  }, [characters]);

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
