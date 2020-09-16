import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MDBCard, MDBCardTitle, MDBCardImage, MDBContainer, MDBCardBody, MDBRow, MDBCol,
} from 'mdbreact';
import PhaserBro from '../assets/PhaserBro.gif';
import Score from './Score';

const { getScoresByUser } = require('../helpers/helpers.js');

const Profile = ({ user }) => {
  const [userScoresByGame, setUserScoresByGame] = useState([]);

  const {
    username, profilePhotoUrl, idUser,
  } = user;

  useEffect(() => {
    console.log(idUser);
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
          <MDBRow>
            <MDBCol size="12">
              <MDBCard className="text-center bg-secondary">
                <MDBCardTitle className="p-3 text-white">
                  {username}
                  &apos;s Profile:
                </MDBCardTitle>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol size="6">
              <MDBCard
                className="text-center bg-light mb-3 p-2"
              >
                <MDBCardTitle>
                  {username}
                  &apos;s Scores:
                </MDBCardTitle>
                <>
                  { userScoresByGame.length ? (
                    userScoresByGame.map((game) => (
                      <Score game={game} key={game.idScore} />
                    ))
                  )
                    : 'no scores to show'}
                </>
              </MDBCard>
            </MDBCol>

            <MDBCol size="6" className="text-center">
              <MDBCard className="align-items-center bg-light">
                <MDBCardTitle className="pt-2">
                  {username}
                  &apos;s Picture:
                </MDBCardTitle>
                <MDBCardImage src={profilePhotoUrl} alt="" className="img-fluid" />
              </MDBCard>
            </MDBCol>
          </MDBRow>
          {' '}
        </ >
      ) : (
        <MDBCard className="text-white text-center" style={{ height: '64vh' }}>
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
