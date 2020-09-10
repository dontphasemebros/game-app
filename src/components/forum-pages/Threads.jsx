import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const { getThreadsByChannel, submitThread } = require('../../helpers/helpers.js');

const Threads = ({ channel, user }) => {
  const idChannel = channel ? channel.idChannel : 0;
  // const { idChannel } = channel;
  const [threads, setThreads] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [reload, setReload] = useState([]);

  const onSubmit = ({ textarea }) => {
    if (textarea !== '') {
      const threadObj = {
        text: textarea,
        idUser: user.idUser,
        idChannel,
      };
      submitThread(threadObj)
        .then(() => {
          reset();
          setReload([]);
        })
        .catch((err) => console.error('ERROR SUBMITTING THREAD: ', err));
    }
  };

  useEffect(() => {
    getThreadsByChannel(idChannel)
      .then((result) => {
        setThreads(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, [reload]);

  return (
    <div>
      {channel && !Array.isArray(user) ? (
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
            </div>
          ))}

          <br />

          <div className="createThread">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span>Start a thread:</span>
              <input name="textarea" className="form-control" rows="3" ref={register} />

              <Button variant="primary" size="sm" type="submit" ref={register}>
                <h6>submit</h6>
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          No Replies Here!
        </div>
      )}
    </div>
  );
};

Threads.propTypes = {
  user: PropTypes.objectOf.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string,
    idChannel: PropTypes.number,
  }).isRequired,
};

export default Threads;
