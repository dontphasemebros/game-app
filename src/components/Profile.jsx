import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const { getScoresByUser } = require('../helpers/helpers.js');

const Profile = ({ user }) => {
  // const [userScores, setUserScores] = useState(user.scores || []);
  const [userScores, setUserScores] = useState([]);
  // const userScores = user.scores || [];

  const {
    username, profilePhotoUrl, idUser,
  } = user;

  useEffect(() => {
    getScoresByUser(idUser)
      .then((result) => {
        setUserScores(result);
      })
      .catch((err) => console.error('ERROR GETTING USER SCORES: ', err));
  }, []);

  return (
    <div style={{ marginLeft: '200px' }}>
      <div style={{ padding: '20px' }}>
        <div className="card text-white bg-secondary mb-3">
          <h2 className="card-header" style={{ minWidth: '700px' }}>
            My Profile
          </h2>
        </div>
      </div>
      <div className="username" style={{ textAlign: 'right' }}>
        <h2>{username}</h2>
        <div>
          <img src={profilePhotoUrl} height="200px" width="200px" alt="profile" />
        </div>
      </div>
      <div className="user-profile">
        <div className="user-high-scores scoreList card text-white bg-secondary mb-3" style={{ display: 'inline-block' }}>
          <h2>
            {username}
            &apos;s Scores:
          </h2>
          <div className="scoreList card text-white bg-secondary mb-3">
            <ul>
              {userScores.map((score) => (
                <li key={score.idScore}>
                  {`${score.value} --- ${score.createdAt.split('T')[0]}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="user-bio bg-light" style={{ maxWidth: '700px' }}>
          <div style={{ padding: '20px' }}>
            <div className="card text-white bg-secondary mb-3" />
          </div>
          <h4>{`username: ${username}`}</h4>
        </div>
      </div>

    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    idUser: PropTypes.number.isRequired,
    username: PropTypes.objectOf.isRequired,
    profilePhotoUrl: PropTypes.string.isRequired,
    scores: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default Profile;
