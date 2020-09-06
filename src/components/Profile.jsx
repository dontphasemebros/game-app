import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ user }) => {
  const userScores = user.scores || [];
  const {
    username, location, profilePhotoUrl,
  } = user;

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
      </div>
      <div className="user-profile">
        <div className="user-high-scores scoreList card text-white bg-secondary mb-3" style={{ display: 'inline-block' }}>
          <h2>
            {username}
            &apos;
            s Scores:
          </h2>
          <div className="scoreList card text-white bg-secondary mb-3">
            <ul>
              {userScores.map((score) => <li key={score.idScore}>{score.value}</li>)}
            </ul>
          </div>
        </div>
        <div className="profile-picture text-white bg-dark mb-3" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>
          <img className="d-print-inline-block" src={profilePhotoUrl} height="500px" width="500px" alt="" style={{ display: 'inline-block' }} />
        </div>
        <div className="user-bio bg-light" style={{ maxWidth: '700px' }}>
          <div style={{ padding: '20px' }}>
            <div className="card text-white bg-secondary mb-3">
              <h2 className="card-header" style={{ maxWidth: '700px' }}>
                {`${username}'s bio`}
              </h2>
            </div>
          </div>
          <h4>{`username: ${username}`}</h4>
          <h4>
            Location:
            {location}
          </h4>
        </div>
      </div>

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
