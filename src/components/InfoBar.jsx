import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/closeIcon.png';
import onlineIcon from '../assets/onlineIcon.png';

import './CSS/InfoBar.css';

const InfoBar = ({ room, users }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" alt="online icon" src={onlineIcon} />
      <h3>
        {room}
      </h3>
      <h6 className="sixers">
        {users.length}
        {' '}
        Online
      </h6>
    </div>
    <div className="rightInnerContainer">
      <a href="/join">
        <img src={closeIcon} alt="close chat" />
      </a>
    </div>
  </div>
);

export default InfoBar;

InfoBar.propTypes = {
  room: PropTypes.string.isRequired,
  users: PropTypes.arrayOf.isRequired,
};
