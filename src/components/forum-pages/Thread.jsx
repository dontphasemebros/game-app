import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Button, Card, Col, Image,
} from 'react-bootstrap';
import PhotoUpload from './PhotoUpload';

const {
  getThreadReplies, submitReply, uploadPhoto, removeThread, removeReply,
} = require('../../helpers/helpers.js');

const Thread = ({ user, convertTime }) => {
  const { register, handleSubmit, reset } = useForm();
  const [reload, setReload] = useState([]);
  const { threadId } = useParams();
  const [thread, setThread] = useState([{}]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getThreadReplies(threadId)
      .then((result) => {
        setThread(result);
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
          idThread: threadId,
        };
        const submittedReply = await submitReply(replyObj);
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

  const handleClick = ((idThread) => {
    removeThread(idThread)
      .then(() => {
        reset();
        setReload([]);
      })
      .catch((err) => console.error('ERROR DELETING THREAD: ', err));
  });

  const clickHandler = ((idReply) => {
    removeReply(idReply)
      .then(() => {
        reset();
        setReload([]);
      })
      .catch((err) => console.error('ERROR DELETING REPLY: ', err));
  });

  return (
    <div>
      {thread[0] && thread[0].replies && !Array.isArray(user) ? (
        <div>
          <br />
          <Card key={thread[0].idThread}>
            <div className="card flex-row flex-wrap">
              <div className="card-header border-0">
                <img src={thread[0].profilePhotoUrl} height="80px" width="80px" alt="" />
              </div>
              <Col className="m-2">
                <div />
                <div className="card-footer">
                  <div />
                  {!thread[0].text ? (
                    null
                  ) : <p className="blockquote mb-0">{thread[0].text}</p> }
                  {!thread[0].photoUrl ? null : (
                    <div>
                      <Image className="card-header border-0" src={thread[0].photoUrl} alt="" fluid />
                    </div>
                  ) }
                </div>
                <span>
                  {thread[0].idUser === user.idUser ? (
                    <div>
                      <Button variant="outline-danger mt-2 h-50 m-0 p-0" as="input" type="submit" value="DELETE" size="small" onClick={() => { handleClick(thread[0].idThread); }} className="pull-left border-0 z-depth-0" tabIndex="0" />
                      <span className="blockquote-footer text-muted pull-right" style={{ fontSize: '16px' }}>
                        {`you, ${convertTime(thread[0].createdAt)}`}
                      </span>
                    </div>
                  ) : (
                    <span className="blockquote-footer text-muted pull-right" style={{ fontSize: '16px' }}>
                      {`${thread[0].username}, ${convertTime(thread[0].createdAt)}`}
                    </span>
                  )}
                </span>
              </Col>
            </div>
          </Card>

          <br />

          <Card className="createReply inline-block">
            <form onSubmit={handleSubmit(onSubmit)} className="m-3">
              <span>Reply:</span>
              <input name="textarea" className="form-control bg-light blockquote mb-0" rows="3" ref={register} />
              <br />
              <PhotoUpload file={file} changeHandler={fileChangeHandler} ref={register} />
              <br />
              <Button variant="primary" as="input" value="submit" type="submit" ref={register} size="lg" className="m-0 pull-right" />
            </form>
          </Card>

          <br />

          {thread[0].replies.map((reply) => (
            <Card key={reply.idReply}>
              <div className="card flex-row flex-wrap">
                <div className="card-header border-0">
                  <img src={reply.profilePhotoUrl} height="80px" width="80px" alt="" />
                </div>
                <Col className="m-2">
                  <div />
                  <div className="card-footer">
                    <div />
                    {!reply.text ? (
                      null
                    ) : <p className="blockquote mb-0">{reply.text}</p> }
                    {!reply.photoUrl ? null : (
                      <div>
                        <Image className="card-header border-0" src={reply.photoUrl} alt="" fluid />
                      </div>
                    ) }
                  </div>
                  <span>
                    {reply.idUser === user.idUser ? (
                      <div>
                        <Button variant="outline-danger mt-2 h-50 m-0 p-0" as="input" type="submit" value="DELETE" size="small" onClick={() => { clickHandler(reply.idReply); }} className="pull-left border-0 z-depth-0" tabIndex="0" />
                        <span className="blockquote-footer text-muted pull-right" style={{ fontSize: '16px' }}>
                          {`you, ${convertTime(reply.createdAt)}`}
                        </span>
                      </div>
                    ) : (
                      <span className="blockquote-footer text-muted pull-right" style={{ fontSize: '16px' }}>
                        {`${reply.username}, ${convertTime(reply.createdAt)}`}
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

Thread.propTypes = {
  convertTime: PropTypes.func.isRequired,
  user: PropTypes.objectOf.isRequired,
};

export default Thread;
