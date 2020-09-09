import React from 'react';
import PropTypes from 'prop-types';
import Threads from './Threads';

const Channel = ({ channel, threadId, user }) => (
  <div>
    <div style={{ marginTop: '20px', padding: '15px' }}>
      <div className="card text-white bg-secondary mb-3">
        <h2 className="card-header">
          {channel.name}
        </h2>
      </div>
    </div>

    <Threads user={user} threadId={threadId} channel={channel} />

  </div>
);

Channel.propTypes = {
  user: PropTypes.objectOf.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string,
    idChannel: PropTypes.number,
  }).isRequired,
  threadId: PropTypes.number.isRequired,
};

export default Channel;
