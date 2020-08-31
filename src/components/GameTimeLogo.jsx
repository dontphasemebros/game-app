import React from 'react';
import GTL from '../assets/Gametime Logo.png';

const Logo = () => {
  const imgStyle = {
    height: '150px',
    width: '500px',
  };

  return (
    <div>
      <img src={GTL} alt="GameTime Logo" style={imgStyle} />
    </div>
  );
};

export default Logo;
