import React from 'react';
import PropTypes from 'prop-types';
import PhaserBro from '../assets/PhaserBro.gif';

const Profile = ({ user }) => {
  const userScores = user.scores || [];
  const {
    username, location, profilePhotoUrl,
  } = user;

  return (
    <div>
      {user.username !== undefined ? (
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
                  {userScores.map((score) => <li key={score.idScore}>{score.value}</li>)}
                </ul>
              </div>
            </div>
            <div className="user-bio bg-light" style={{ maxWidth: '700px' }}>
              <h4>{`username: ${username}`}</h4>
              <h4>
                Location:
                {location}
              </h4>
            </div>
          </div>

        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <br />
          <h1>Please Login With Discord or Google</h1>
          <img src={PhaserBro} alt="PhaserBro" />
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.objectOf.isRequired,
    location: PropTypes.string.isRequired,
    profilePhotoUrl: PropTypes.string.isRequired,
    scores: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default Profile;
