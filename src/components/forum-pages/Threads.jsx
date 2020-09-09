import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

const { getThreadsByChannel } = require('../../helpers/helpers.js');
// ************** NOTE: SAMPLE DATA CHANNEL 1 IS EMPTY

// export const Thread = () => (
//   <div>
//     THREAD
//   </div>
// );

const Threads = ({ channel }) => {
  const { idChannel } = channel;
  const [threads, setThreads] = useState([]);
  // const [threadId, setThreadId] = useState([]);
  useEffect(() => {
    getThreadsByChannel(idChannel)
      .then((result) => {
        setThreads(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, []);

  // useEffect(() => {
  //   setIdThread()
  // }, []);

  // const handleClick = (e) => {
  //   // e.preventDefault();
  //   setThreadId(e.target.id);
  //   console.log('idThread after setting state: ', threadId);
  // };
  // onClick={(e) => { handleClick(e); }}

  return (
    <div>
      {threads.map((thread) => (
        <div key={thread.idThread} className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px' }}>
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
            <Link to={`/thread${thread.idThread}`} id={thread.idThread} variant="primary" size="lg">
              {thread.text}
            </Link>

          </div>
          {/* <Route path="/thread/:threadId" component={Thread} /> */}
        </div>
      ))}
    </div>
  );
};

Threads.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string,
    idChannel: PropTypes.number,
  }).isRequired,
};

export default Threads;
