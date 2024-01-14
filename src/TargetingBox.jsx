const TargetingBox = ({ left, top}) => {
  const boxStyle = {
    // subtracting the 20 so that the cursor positions better
    top: `${top - 20}px`,
    left: `${left - 20}px`,
  }
  return (
    <div className="targeting-box" style={boxStyle}>
    </div>
  );
}

export default TargetingBox;
