import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MDBCard, MDBCardTitle, MDBCardImage, MDBContainer, MDBCardBody,
} from 'mdbreact';
import PhaserBro from '../assets/PhaserBro.gif';

const { getScoresByUser } = require('../helpers/helpers.js');

const Profile = ({ user }) => {
  const [userScoresByGame, setUserScoresByGame] = useState([]);

  const {
    username, profilePhotoUrl, idUser,
  } = user;

  useEffect(() => {
    getScoresByUser(idUser)
      .then((result) => {
        setUserScoresByGame(result);
      })
      .catch((err) => console.error('ERROR GETTING USER SCORES: ', err));
  }, []);

  return (
    <MDBContainer>
      {user.username ? (
        <>
          {' '}
          <MDBCard style={{ padding: '20px' }}>
            <MDBCardTitle>
              {username}
              {' '}
              Profile
            </MDBCardTitle>
          </MDBCard>
          <MDBCard className="username" style={{ textAlign: 'right' }}>
            <MDBCardTitle>{username}</MDBCardTitle>
            <MDBCardImage src={profilePhotoUrl} style={{ float: 'right' }} />
          </MDBCard>
          <MDBCard
            className="user-high-scores scoreList card text-white bg-secondary mb-3"
            style={{ display: 'inline-block' }}
          >
            <MDBCardTitle>
              {username}
              &apos;s Scores:
            </MDBCardTitle>
            <MDBCardBody>
              <ul>
                {/* REFACTOR FOR MULTI-GAME SCORES */}
                {userScoresByGame[0].scores.map((score) => (
                  <li key={score.idScore}>
                    {`${score.value} --- ${score.createdAt.split('T')[0]}`}
                  </li>
                ))}
              </ul>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="user-bio bg-light">
            <MDBCardTitle>
              {`username: ${username}`}
            </MDBCardTitle>
          </MDBCard>
          {' '}
        </ >
      ) : (
        <MDBCard style={{ textAlign: 'center' }}>
          <br />
          <MDBCardTitle>
            Please Login With Discord or Google
          </MDBCardTitle>
          <MDBCardBody>
            <img src={PhaserBro} alt="PhaserBro" />
          </MDBCardBody>
        </MDBCard>
      )}
    </MDBContainer>
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
