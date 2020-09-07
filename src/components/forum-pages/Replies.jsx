import React, { } from 'react';
import {} from 'react-hook-form';
import {
} from 'react-bootstrap';
import PropTypes from 'prop-types';

//------------------------------------------------------------
// Methodologies!
const forEachReply = () => {
  const replyData = [
    {
      idReply: 2,
      text: 'ME',
      idThread: 3,
      createdAt: '2020-09-07T15:48:02.208Z',
      idUser: 4,
      idDiscord: '45678',
      username: 'Connor',
      profilePhotoUrl: 'https://avatars1.githubusercontent.com/u/60720268?s=400&u=2236cf34f7c8010753eea568f245a80d9bd77b03&v=4',
      location: 'NOLA',
    },
    {
      idReply: 3,
      text: 'ME TOO',
      idThread: 3,
      createdAt: '2020-09-07T15:48:02.208Z',
      idUser: 3,
      idDiscord: '34567',
      username: 'James',
      profilePhotoUrl: 'https://avatars1.githubusercontent.com/u/57680469?s=400&u=58ab864ffb55ce45866c75fb05e1f6a8e8c6dfb1&v=4',
      location: 'MS',
    },
    {
      idReply: 4,
      text: 'How do I get to the yahtzee page?',
      idThread: 3,
      createdAt: '2020-09-07T15:48:02.208Z',
      idUser: 2,
      idDiscord: '23456',
      username: 'Grant',
      profilePhotoUrl: 'https://lh3.googleusercontent.com/-m4y_kDRtAzw/X1Wi9-R9vfI/AAAAAAAAAAs/K2r4ytmlVsAfHMlCYJx0k91HciN68iz-wCEwYBhgLKtMDAL1Ocqx8ei531lvDSiJrZ8PWUZrPF8XrXltMh75T8Z6myx78ahycFVt7VmEy3rk97EdXTKlOCCA6V053tREBSWBoZPeOaN1-1_cPHEFEBkqgYVwt9CDiDTXtKHQ90bLl4nsGNCCTyevHWCKhQAsVbWScMz7kcyqpB1IiwkZjDlBOtnXrvlSeX1MJyKwnVJqEBrdUYaGITHCCgFMnSVFvmyzQ9F1EYwgSN3PyydDB8a9KLOgfXq-ahS4c0x3GVc3_wXKxYXumx3g1Mrs0xEn8Jr5wRy2u0HnxVyIPuh6Rq8ATIXwj_cmswjwNydUnkJwfOBsqKUkq7-C6BFE4U2si9tEWhuLtmWVKzJCm4PYi3TSlUSjYHXEkBxS-6QQcXoInuuZFVPYEAY03MJvDibY7KmirWvbq3w5KgWNStMQTskia6cSIzpLQmjLeT88CN8rdOkBvp-oHmaEDzwOnr2LyZXCOkw08DRX3gQrbqsGn5GD294S8COVzhHWXDmPZn9Cf5AeKYnKQxoDheXHQsdDGvcFcbXsjHkWuNuIcOnE6oIHgHwztbLGLsmYCpJqKvb-EXvLpIgsIaul2f1Nxq3jXr8guchADa1mNK6tJYw7-bXy5CRww087W-gU/w140-h140-p/bitmoji%2Bpic.JPG',
      location: 'New Orleans',
    },
  ];

  // console.log('THREADS IN REPLIES.JSX forEachReply: ', threads);
  const storage = [];
  for (let i = 0; i < replyData.length; i += 1) {
    storage.push(
      <div
        className="bg-dark inline-block"
        id="GeneralDisussion"
        style={{ padding: '20px' }}
      >
        <div
          className={`profile-picture${i} panel-body text-left inline-block`}
          style={{
            backgroundColor: '#D6DBDF', minWidth: '800px', marginLeft: '100px',
          }}
        >
          <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '360px' }}>
            <img className="d-print-inline-block" src={replyData[i].profilePhotoUrl} height="100px" width="100px" alt="" style={{ display: 'inline-block' }} />
            <div className={`username${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <h5 style={{ marginLeft: '20px', marginRight: '20px', minWidth: '80px' }}>{replyData[i].username}</h5>
            </div>
            <div className={`date${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <span style={{ marginRight: '20px' }}>{replyData[i].createdAt.split('T')[0]}</span>
            </div>
          </div>
          <h4 style={{ display: 'inline-block', marginLeft: '20px' }}>{replyData[i].text}</h4>
        </div>
      </div>,
    );
  }
  return storage;
};

//------------------------------------------------------------
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data) => { alert(data); };
const Replies = ({ discussion }) => (
  <div>
    {discussion[0]}
    <div style={{ padding: '20px' }}>
      <div className="card text-white bg-secondary mb-3">
        <h2 className="card-header">
          Replies
        </h2>
      </div>
    </div>
    <div className="Replies-Body">
      {forEachReply()}
    </div>
  </div>
);
Replies.propTypes = {
  discussion: PropTypes.element.isRequired,
};

export default Replies;
