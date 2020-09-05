import React from 'react';
import GTL from '../assets/Gametime Logo.png';

const Logo = () => {
  const imgStyle = {
    height: '150px',
    width: '500px',
  };

  const divStyle = {
    textAlign: 'center',
  };

  return (
    <div style={divStyle}>
      <br />
      <img src={GTL} alt="GameTime Logo" style={imgStyle} />
      <br />
      <br />
    </div>
  );
};

export default Logo;
