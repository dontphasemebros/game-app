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

const { getThreadReplies, submitReply, uploadPhoto } = require('../../helpers/helpers.js');

const Thread = ({ user, convertTime }) => {
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
                <div className="blockquote-footer pull-right" style={{ fontSize: '16px' }}>
                  <span className="text-muted">
                    {thread[0].username}
                    {', '}
                    {convertTime(thread[0].createdAt)}
                  </span>
                </div>
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
                  <div className="blockquote-footer pull-right" style={{ fontSize: '16px' }}>
                    <span className="text-muted">
                      {reply.username}
                      {', '}
                      {convertTime(reply.createdAt)}
                    </span>
                  </div>
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
