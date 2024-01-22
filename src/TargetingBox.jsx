import { useState, useRef, useEffect } from "react";

const Dropdown = ({ targetingBoxCoords, onCharacterSelect }) => {

  const handleSelectionChange = (e) => {
    const character = e.target.value;
    onCharacterSelect(character, targetingBoxCoords)
  };

  return (
    <div>
      <select
        id="characterDropdown"
        onChange={handleSelectionChange}
        className="character-dropdown"
      >
        <option value="">Who is this?</option>
        <option value="Washington Carver">Washington Carver</option>
        <option value="Einstein">Einstein</option>
        <option value="Curie">Curie</option>
        <option value="Newton">Newton</option>
        <option value="Ride">Ride</option>
      </select>
    </div>
  );
};

const TargetingBox = ({ left, top, onCharacterSelect }) => {
  const [targetingBoxCoords, setTargetingBoxCoords] = useState(null);  
  const targetingBoxRef = useRef(null);

  useEffect(() => {
    // Calculate the width and height of the targeting box
    // Calculate the location of the targeting box
    // set the location of the targeting box
    const targetingBoxRect = targetingBoxRef.current.getBoundingClientRect();
    let [xCoord, yCoord] = [targetingBoxRect.left, targetingBoxRect.top];
    let width = targetingBoxRef.current.clientWidth;
    let height = targetingBoxRef.current.clientHeight;

    setTargetingBoxCoords({ x: [xCoord, xCoord + width], y: [yCoord, yCoord + height] });

  }, []);

  const boxStyle = {
    top: `${top - 10}px`,
    left: `${left - 10}px`,
  };

  return (
    <div className="targeting-box" style={boxStyle} ref={targetingBoxRef}>
      <Dropdown targetingBoxCoords={targetingBoxCoords} onCharacterSelect={onCharacterSelect} />
    </div>
  );
};

export default TargetingBox;
