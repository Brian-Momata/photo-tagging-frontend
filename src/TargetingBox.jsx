import { useState } from "react"

const Dropdown = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleSelectionChange = (e) => {
    setSelectedCharacter(() => e.target.value);
  };

  return (
    <div>
      <select
        id="characterDropdown"
        value={selectedCharacter}
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
  )
}


const TargetingBox = ({ left, top}) => {
  const boxStyle = {
    // subtracting the 10px so that the cursor positions better
    top: `${top - 10}px`,
    left: `${left - 10}px`,
  }
  return (
    <div className="targeting-box" style={boxStyle}>
      < Dropdown />
    </div>
  );
}

export default TargetingBox;
