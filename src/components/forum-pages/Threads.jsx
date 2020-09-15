import React, { useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Button, Col, Card, Image,
} from 'react-bootstrap';
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
        setFile(null);
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
            <Card key={thread.idThread}>
              <div className="card flex-row flex-wrap">
                <div className="card-header border-0">
                  <img src={thread.profilePhotoUrl} height="80px" width="80px" alt="" />
                </div>
                <Col className="m-2">
                  <div />
                  <div className="card-footer">
                    <div />
                    {!thread.text ? (
                      null
                    ) : (
                      <Link to={`/thread${thread.idThread}`} id={thread.idThread}>
                        <p className="blockquote mb-0">{thread.text}</p>
                      </Link>
                    )}
                    {!thread.photoUrl ? null : (
                      <Link to={`/thread${thread.idThread}`} id={thread.idThread}>
                        <Image className="card-header border-0" src={thread.photoUrl} alt="" fluid />
                      </Link>
                    ) }
                  </div>
                  <div className="blockquote-footer pull-right" style={{ fontSize: '16px' }}>
                    <span className="text-muted">
                      {thread.username}
                      {' '}
                      {thread.createdAt.split('T')[0]}
                    </span>
                  </div>
                </Col>
              </div>
            </Card>
          ))}

          <br />

          <div className="createThread">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span>Start a thread:</span>
              <input name="textarea" className="form-control" rows="3" ref={register} />
              <br />
              <PhotoUpload file={file} changeHandler={fileChangeHandler} ref={register} />
              <br />
              <Button variant="primary" as="input" value="submit" type="submit" ref={register} size="lg" />
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
