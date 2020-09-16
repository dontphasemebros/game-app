import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MDBCard, MDBCardTitle, MDBCardImage, MDBContainer, MDBCardBody, MDBRow, MDBCol,
} from 'mdbreact';
import {
  Card, Col, Image,
} from 'react-bootstrap';
import PhaserBro from '../assets/PhaserBro.gif';
import Score from './Score';

const { getScoresByUser, getPostsByUser } = require('../helpers/helpers.js');

const Profile = ({ user }) => {
  const [userScoresByGame, setUserScoresByGame] = useState([]);
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    getPostsByUser(idUser)
      .then((result) => {
        console.log('****getPostsByUser then block*****', result);
        setPosts(result);
      })
      .catch((err) => console.error('ERROR GETTING POSTS: ', err));
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

          <MDBRow className="no-gutters">
            <MDBCol>
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

            <MDBCol className="text-center">
              <MDBCard className="align-items-center bg-light">
                <MDBCardTitle className="pt-2">
                  {username}
                  &apos;s Picture:
                </MDBCardTitle>
                <MDBCardImage src={profilePhotoUrl} alt="" className="img-fluid p-3" />
              </MDBCard>
              <div className="w-100" />
              {posts.map((post) => (
                <Card key={post.idThread}>
                  <div className="card flex-row flex-wrap">
                    <div className="card-header border-0">
                      <img src={post.profilePhotoUrl} height="80px" width="80px" alt="" />
                    </div>
                    <Col className="m-2">
                      <div />
                      <div className="card-footer">
                        <div />
                        {!post.text ? (
                          null
                        ) : <p className="blockquote mb-0">{post.text}</p> }
                        {!post.photoUrl ? null : (
                          <div>
                            <Image className="card-header border-0" src={post.photoUrl} alt="" fluid />
                          </div>
                        ) }
                      </div>
                      <div className="blockquote-footer pull-right" style={{ fontSize: '16px' }}>
                        <span className="text-muted">
                          {post.username}
                          {' '}
                          {post.createdAt.split('T')[0]}
                        </span>
                      </div>
                    </Col>
                  </div>
                </Card>
              ))}
            </MDBCol>
          </MDBRow>
          {' '}
        </ >
      ) : (
        <MDBCard className="text-black text-center" style={{ height: '64vh' }}>
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
