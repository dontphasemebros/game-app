import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MDBCard, MDBCardTitle, MDBCardImage, MDBContainer, MDBCardBody, MDBRow, MDBCol,
} from 'mdbreact';
import PhaserBro from '../assets/PhaserBro.gif';

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
              <MDBCard className="text-center">
                <MDBCardTitle className="p-3">
                  {username}
                  &apos;s Profile:
                </MDBCardTitle>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol size="6">
              <MDBCard
                className="text-white text-center bg-secondary mb-3 pt-2"
              >
                <MDBCardTitle>
                  {username}
                  &apos;s Scores:
                </MDBCardTitle>
                <MDBCardBody className="text-white align-center bg-secondary mb-3 pt-2 width-auto">
                  { userScoresByGame.length ? (
                    // className="ml-30 pl-30"
                    /* REFACTOR FOR MULTI-GAME SCORES */
                    <MDBCardBody className="d-flex justify-content-center">
                      <ul className="align-center mw-auto">
                        {userScoresByGame[0].scores.map((score) => (
                          <li key={score.idScore} className="text-left mw-auto">
                            {`${score.value} --- ${score.createdAt.split('T')[0]}`}
                          </li>
                        ))}
                      </ul>
                    </MDBCardBody>
                  ) : '' }
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol size="6" className="text-center">
              <MDBCard className="align-items-center">
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
        <MDBCard className="text-white text-center bg-secondary mb-3 pt-2">
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
