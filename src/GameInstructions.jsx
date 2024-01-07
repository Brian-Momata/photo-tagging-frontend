import Image from "./Image";
import { useState } from "react";

const GameInstructions = () => {
  const [showCharacter, setShowCharacter] = useState(false);

  function handleClick() {
    setShowCharacter(true);
    setTimeout(() => setShowCharacter(false), 5000);
  }

  return (
    <div className="game-instructions">
      <p>You will need to find each of the characters from the photo. Good luck!</p>
      <button onClick={handleClick}>Click to peek at the characters</button>
      {showCharacter && 
      <Image
        name={"photo-tagging-characters.jpg"}
        altname={"Names of characters"}
      />}
    </div>
  )
};

export default GameInstructions;
