import React, { useState, useEffect } from 'react';
import {
  Navbar,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const { getThreadsByChannel } = require('../../helpers/helpers.js');
// ************** NOTE: SAMPLE DATA CHANNEL 1 IS EMPTY

const Thread = ({ channel }) => {
  const { idChannel } = channel;
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    getThreadsByChannel(idChannel)
      .then((result) => {
        setThreads(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, []);
  return (
    <div>
      {threads.map((thread) => (
        <div className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px' }}>
          <div className="profile-picture panel-body text-left inline-block">
            <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '360px' }}>
              <img className="d-print-inline-block" src={thread.profilePhotoUrl} height="100px" width="100px" alt="" style={{ display: 'inline-block' }} />
              <div className="username panel-body text-left inline-block" style={{ display: 'inline-block' }}>
                <h5 style={{ marginLeft: '20px', marginRight: '20px', minWidth: '80px' }}>{thread.username}</h5>
              </div>
              <div className="date panel-body text-left inline-block" style={{ display: 'inline-block' }}>
                <span style={{ marginRight: '20px' }}>{thread.createdAt.split('T')[0]}</span>
              </div>
            </div>
            <Navbar.Brand href="/replies">
              <h4 style={{ display: 'inline-block', marginLeft: '20px' }}>{thread.text}</h4>
            </Navbar.Brand>
          </div>
        </div>
      ))}
    </div>
  );
};

Thread.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string,
    idChannel: PropTypes.number,
  }).isRequired,
};

export default Thread;
