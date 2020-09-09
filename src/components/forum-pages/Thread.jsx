import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const { getThreadReplies } = require('../../helpers/helpers.js');

const Thread = () => {
  const { threadId } = useParams();

  const [thread, setThread] = useState([]);
  // const [threadId, setThreadId] = useState([]);
  useEffect(() => {
    getThreadReplies(threadId)
      .then((result) => {
        setThread(result);
      })
      .catch((err) => console.error('ERROR GETTING THREADS: ', err));
  }, []);
  console.log('THREADID ONLY IN THREAD.JSX: ', threadId);
  console.log('THREAD IN THREAD.JSX: ', thread);
  return (
    <div>
      {thread.username}
      <br />
      {thread.text}
    </div>
  );
};
export default Thread;
