import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PhotoUpload from './PhotoUpload';

const { getThreadReplies, submitReply, uploadPhoto } = require('../../helpers/helpers.js');

const Thread = ({ user }) => {
  const { register, handleSubmit, reset } = useForm();
  const [reload, setReload] = useState([]);
  const { threadId } = useParams();
  const [thread, setThread] = useState([{}]);
  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => {
    setFile(null);
    e.persist();
    if (e.target.files) {
      const newImage = {
        name: e.target.files[0].name,
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };
      setFile(newImage);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    const { textarea } = data;

    async function photoUploader(photoData) {
      try {
        const photoUrl = await uploadPhoto(photoData);
        const replyObj = {
          text: textarea.trim(),
          photoUrl,
          idUser: user.idUser,
          idThread: threadId,
        };
        const submittedReply = await submitReply(replyObj);
        reset();
        setReload([]);
        return submittedReply;
      } catch (err) {
        return console.error('ERROR SUBMITTING PHOTO REPLY: ', err);
      }
    }
    if (file) {
      formData.append('file', file.file);
      photoUploader(formData);
    }
    if (!file) {
      if (textarea.split(/[\s\n\r\t]/).filter((str) => str.length).length) {
        const replyObj = {
          text: textarea.trim(),
          idUser: user.idUser,
          idThread: threadId,
        };
        submitReply(replyObj)
          .then(() => {
            reset();
            setReload([]);
          })
          .catch((err) => console.error('ERROR SUBMITTING REPLY: ', err));
      }
    }
  };

  useEffect(() => {
    getThreadReplies(threadId)
      .then((result) => {
        setThread(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, [reload]);

  return (
    <div>
      {thread[0] && thread[0].replies && !Array.isArray(user) ? (
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
                <br />
                <img className="d-print-inline-block" src={reply.photoUrl} alt="" style={{ display: 'inline-block' }} />
              </div>
            </div>
          ))}

          <br />

          <div className="createReply">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span>Reply:</span>
              <input name="textarea" className="form-control" rows="3" ref={register} />
              <br />
              <PhotoUpload file={file} changeHandler={fileChangeHandler} ref={register} />
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

Thread.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default Thread;
