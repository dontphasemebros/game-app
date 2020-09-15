import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PhaserBro from '../assets/PhaserBro.gif';

const Forum = ({ user }) => (
  <>
    {!Array.isArray(user) ? (
      <div>
        <div>
          <br />
          <div className="card text-white bg-secondary mb-3">
            <h2 className="card-header">
              GameTime Forum
            </h2>
          </div>
        </div>
        <div>
          <Card className="card bg-light mb-3">
            <Link to="/general">
              <h5 className="card-header">General</h5>
            </Link>
          </Card>
          <Card className="card bg-light mb-3">
            <Link to="/challenges">
              <h5 className="card-header">Challenges</h5>
            </Link>
          </Card>
          <Card className="card bg-light mb-3">
            <Link to="/suggestions">
              <h5 className="card-header">Suggestions</h5>
            </Link>
          </Card>
          <Card className="card bg-light mb-3">
            <Link to="/gamer-news">
              <h5 className="card-header">Gamer News</h5>
            </Link>
          </Card>
        </div>
        <br />
      </div>
    ) : (
      <div style={{ textAlign: 'center' }}>
        <h1>Please Login With Discord or Google</h1>
        <img src={PhaserBro} alt="PhaserBro" />
      </div>
    )}
  </>
);

Forum.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default Forum;
