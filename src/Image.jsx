const Image = ({name, altname, handleClick}) => {
  return (
    <img
        src={`src/assets/${name}`}
        alt={altname}
        className="main-image"
        onClick={handleClick}
    />
  )
};

export default Image;
