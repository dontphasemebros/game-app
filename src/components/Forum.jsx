import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Forum = ({ user }) => (
  <div>
    <div style={{ marginTop: '20px', padding: '15px' }}>
      <div className="card text-white bg-secondary mb-3">
        <h2 className="card-header">
          GameTime Forum
        </h2>
      </div>
    </div>
    {!Array.isArray(user) ? (
      <div>
        <Button href="/general" variant="primary" size="lg">
          <h6>General</h6>
        </Button>
        <Button href="/challenges" variant="primary" size="lg">
          <h6>Challenges</h6>
        </Button>
        <Button href="/suggestions" variant="primary" size="lg">
          <h6>Suggestions</h6>
        </Button>
        <Button href="/gamer-news" variant="primary" size="lg">
          <h6>Gamer News</h6>
        </Button>
      </div>
    ) : (<div>Please Login With Discord or Google</div>)}
  </div>
);

Forum.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default Forum;
