import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// import { addThread } from '../../../database/index.js';

const { getThreadsByChannel, submitThread } = require('../../helpers/helpers.js');
// ************** NOTE: SAMPLE DATA CHANNEL 1 IS EMPTY

const Threads = ({ channel, user }) => {
  const { idChannel } = channel;
  const [threads, setThreads] = useState([]);
  const { register, handleSubmit } = useForm();
  const [reload, setReload] = useState([]);

  const onSubmit = (input) => {
    const threadObj = {
      text: input.textarea,
      idUser: user.idUser,
      idChannel,
    };
    submitThread(threadObj)
      .then(() => {
        setReload('');
      })
      .catch((err) => console.error('ERROR SUBMITTING THREAD: ', err));
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

          <input style={{ textAlign: 'right' }} type="submit" />
        </form>
      </div>
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
