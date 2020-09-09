import React, { } from 'react';
import {} from 'react-hook-form';
import {
} from 'react-bootstrap';
import PropTypes from 'prop-types';

//------------------------------------------------------------

const Replies = ({ threadId }) => {
  console.log('THREAD ID IN REPLIES', threadId);
  return (
    <div>
      REPLIES
    </div>
  );
};

Replies.propTypes = {
  threadId: PropTypes.element.isRequired,
};

export default Replies;
