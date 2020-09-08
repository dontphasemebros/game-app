import React from 'react';
import PropTypes from 'prop-types';
import Thread from './Thread';

const Channel = ({ channel }) => (
  <div>
    <div style={{ marginTop: '20px', padding: '15px' }}>
      <div className="card text-white bg-secondary mb-3">
        <h2 className="card-header">
          {channel.name}
        </h2>
      </div>
    </div>

    <Thread channel={channel} />

  </div>
);

Channel.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string,
    idChannel: PropTypes.number,
  }).isRequired,
};

export default Channel;
