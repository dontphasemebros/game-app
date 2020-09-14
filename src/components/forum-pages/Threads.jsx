import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import PhotoUpload from './PhotoUpload';

const { getThreadsByChannel, submitThread, uploadPhoto } = require('../../helpers/helpers.js');

const Threads = ({ channel, user }) => {
  const idChannel = channel ? channel.idChannel : 0;
  const [threads, setThreads] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [reload, setReload] = useState([]);
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
          idChannel,
        };
        const submittedReply = await submitThread(replyObj);
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
          idChannel,
        };
        submitThread(replyObj)
          .then(() => {
            reset();
            setReload([]);
          })
          .catch((err) => console.error('ERROR SUBMITTING REPLY: ', err));
      }
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
                <br />
                <img className="d-print-inline-block" src={thread.photoUrl} alt="" style={{ display: 'inline-block' }} />
              </div>
            </div>
          ))}

          <br />

          <div className="createThread">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span>Start a thread:</span>
              <input name="textarea" className="form-control" rows="3" ref={register} />
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

Threads.propTypes = {
  user: PropTypes.objectOf.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string,
    idChannel: PropTypes.number,
  }).isRequired,
};

export default Threads;
