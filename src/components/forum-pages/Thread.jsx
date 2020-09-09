import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const { getThreadReplies, submitReply } = require('../../helpers/helpers.js');

const Thread = ({ user }) => {
  const { register, handleSubmit } = useForm();
  // const [reload, setReload] = useState([]);
  const { threadId } = useParams();
  const [thread, setThread] = useState([{}]);

  const onSubmit = (input) => {
    const replyObj = {
      text: input.textarea,
      idUser: user.idUser,
      idThread: threadId,
    };
    submitReply(replyObj)
      .then((result) => {
        console.log('SUBMIT REPLY RESULT IN THREAD.JSX', result);
      })
      .catch((err) => console.error('ERROR SUBMITTING REPLY: ', err));
  };

  useEffect(() => {
    getThreadReplies(threadId)
      .then((result) => {
        setThread(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, []);

  return (
    <div>
      {thread[0].replies ? (
        <div>
          <div key={thread[0].idThread} className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px', paddingTop: '10px' }}>
            <div className="profile-picture panel-body text-left inline-block">
              <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '360px' }}>
                <img className="d-print-inline-block" src={thread[0].profilePhotoUrl} height="100px" width="100px" alt="" style={{ display: 'inline-block' }} />
                <div className="username panel-body text-left inline-block" style={{ display: 'inline-block' }}>
                  <h5 style={{ marginLeft: '20px', marginRight: '20px', minWidth: '80px' }}>{thread[0].username}</h5>
                </div>
                <div className="date panel-body text-left inline-block" style={{ display: 'inline-block' }}>
                  <span style={{ marginRight: '20px' }}>{thread[0].createdAt.split('T')[0]}</span>
                </div>
              </div>
              {thread[0].text}
            </div>
          </div>

          <br />

          {thread[0].replies.map((reply) => (
            <div key={reply.idThread} className="panel-primary inline-block" id="GeneralDisussion" style={{ backgroundColor: '#D6DBDF', minWidth: '1100px' }}>
              <div className="profile-picture panel-body text-left inline-block">
                <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '360px' }}>
                  <img className="d-print-inline-block" src={reply.profilePhotoUrl} height="100px" width="100px" alt="" style={{ display: 'inline-block' }} />
                  <div className="username panel-body text-left inline-block" style={{ display: 'inline-block' }}>
                    <h5 style={{ marginLeft: '20px', marginRight: '20px', minWidth: '80px' }}>{reply.username}</h5>
                  </div>
                  <div className="date panel-body text-left inline-block" style={{ display: 'inline-block' }}>
                    <span style={{ marginRight: '20px' }}>{reply.createdAt.split('T')[0]}</span>
                  </div>
                </div>
                {reply.text}
              </div>
            </div>
          ))}

          <br />

          <div className="createReply">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span>Reply:</span>
              <input name="textarea" className="form-control" rows="3" ref={register} />

              <input style={{ textAlign: 'right' }} type="submit" />
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

Thread.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default Thread;
