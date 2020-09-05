import React, {} from 'react';
import {} from 'react-hook-form';
import {
} from 'react-bootstrap';
import PropTypes from 'prop-types';

//------------------------------------------------------------
// Methodologies!
const forEachReply = () => {
  const storage = [];
  for (let i = 0; i < 4; i += 1) {
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
          <div className="bg-secondary" style={{ display: 'inline-block', minWidth: '300px' }}>
            <img className="d-print-inline-block" src="https://www.nationalgeographic.com/content/dam/animals/2019/10/goldfish/01-goldfish-nationalgeographic_1567132.jpg" height="100px" width="100px" alt="" style={{ display: 'inline-block' }} />
            <div className={`username${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <h5>Goldfish</h5>
            </div>
            <div className={`date${i} panel-body text-left inline-block`} style={{ display: 'inline-block' }}>
              <span style={{ marginRight: '20px' }}>10/20/2020</span>
            </div>
          </div>
          <h4 style={{ display: 'inline-block' }}>{Math.floor(Math.random() * 9999999999999999999999999999999999999999)}</h4>
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
