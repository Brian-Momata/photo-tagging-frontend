const Image = ({name, altname, className, handleClick}) => {
  return (
    <img
        src={`src/assets/${name}`}
        alt={altname}
        className= {className}
        onClick={handleClick}
    />
  )
};

export default Image;
