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

const {
  getThreadsByChannel, submitThread, uploadPhoto, removeThread,
} = require('../../helpers/helpers.js');

const Threads = ({ channel, user, convertTime }) => {
  const idChannel = channel ? channel.idChannel : 0;
  const [threads, setThreads] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [reload, setReload] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getThreadsByChannel(idChannel)
      .then((result) => {
        setThreads(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, [reload]);

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
        return console.error('ERROR SUBMITTING PHOTO THREAD: ', err);
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
          .catch((err) => console.error('ERROR SUBMITTING THREAD: ', err));
      }
    }
  };

  const handleClick = ((idThread) => {
    removeThread(idThread)
      .then(() => {
        reset();
        setReload([]);
      })
      .catch((err) => console.error('ERROR DELETING THREAD: ', err));
  });

  return (
    <div>
      {channel && !Array.isArray(user) ? (
        <div>
          <Card className="createThread inline-block">
            <form onSubmit={handleSubmit(onSubmit)} className="m-3">
              <span>Start a thread:</span>
              <input name="textarea" className="form-control bg-light blockquote mb-0" rows="3" ref={register} />
              <br />
              <PhotoUpload file={file} changeHandler={fileChangeHandler} ref={register} />
              <br />
              <Button variant="primary" as="input" value="submit" type="submit" ref={register} size="lg" className="m-0 pull-right" />
            </form>
          </Card>

          <br />

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
                      <Link to={`/thread${thread.idThread}`} id={thread.idThread} style={{ color: 'black' }}>
                        <p className="blockquote mb-0">{thread.text}</p>
                      </Link>
                    )}
                    {!thread.photoUrl ? null : (
                      <Link to={`/thread${thread.idThread}`} id={thread.idThread}>
                        <Image className="card-header border-0" src={thread.photoUrl} alt="" fluid />
                      </Link>
                    ) }
                  </div>
                  <span>
                    {thread.idUser === user.idUser ? (
                      <div>
                        <Button variant="outline-danger mt-2 h-50 m-0 p-0" as="input" type="submit" value="DELETE" size="small" onClick={() => { handleClick(thread.idThread); }} className="pull-left border-0 z-depth-0" tabIndex="0" />
                        <span className="blockquote-footer text-muted pull-right" style={{ fontSize: '16px' }}>
                          {`you, ${convertTime(thread.createdAt)}`}
                        </span>
                      </div>
                    ) : (
                      <span className="blockquote-footer text-muted pull-right" style={{ fontSize: '16px' }}>
                        {`${thread.username}, ${convertTime(thread.createdAt)}`}
                      </span>
                    )}
                  </span>
                </Col>
              </div>
            </Card>
          ))}

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
  convertTime: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string,
    idChannel: PropTypes.number,
  }).isRequired,
};

export default Threads;
