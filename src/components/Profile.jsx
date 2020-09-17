import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MDBCard, MDBCardTitle, MDBCardImage, MDBContainer, MDBCardBody, MDBRow, MDBCol,
} from 'mdbreact';
import {
  Button, Card, Col, Image,
} from 'react-bootstrap';
import {
  Link,
} from 'react-router-dom';
import PhaserBro from '../assets/PhaserBro.gif';
import Score from './Score';

const { getScoresByUser, getPostsByUser, removeThread } = require('../helpers/helpers.js');

const Profile = ({ user, convertTime }) => {
  const [userScoresByGame, setUserScoresByGame] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState([]);

  useEffect(() => {
    getScoresByUser(user.idUser)
      .then((result) => {
        setUserScoresByGame(result);
      })
      .catch((err) => console.error('ERROR GETTING USER SCORES: ', err));
  }, [user, reload]);

  useEffect(() => {
    getPostsByUser(user.idUser)
      .then((result) => {
        setPosts(result);
      })
      .catch((err) => console.error('ERROR GETTING POSTS: ', err));
  }, [user, reload]);

  const handleClick = ((idThread) => {
    removeThread(idThread)
      .then(() => {
        setReload([]);
      })
      .catch((err) => console.error('ERROR DELETING THREAD: ', err));
  });

  return (
    <MDBContainer>
      {!Array.isArray(user) && convertTime ? (
        <>
          {' '}
          <MDBRow>
            <MDBCol size="12">
              <MDBCard className="text-center bg-secondary">
                <MDBCardTitle className="p-3 text-white">
                  {user.username}
                  &apos;s Profile:
                </MDBCardTitle>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow className="no-gutters">
            <MDBCol>
              <MDBCard
                className="text-center bg-light mb-3 p-3"
              >
                <MDBCardTitle>
                  {user.username}
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
                <MDBCardTitle className="pt-3">
                  {user.username}
                  &apos;s Picture:
                </MDBCardTitle>
                <MDBCardImage src={user.profilePhotoUrl} alt="" className="img-fluid p-3" />
              </MDBCard>
              <div className="w-100" />
              <MDBCard className="align-items-center bg-light" style={{ display: 'flex', flexDirection: 'col' }}>
                <MDBCardTitle className="p-3">
                  {user.username}
                  &apos;s Posts:
                </MDBCardTitle>
                <Col>
                  {!Array.isArray(user) ? (
                    posts.map((post) => (
                      <Card key={post.idThread} className="flex-col border-0 borderless">
                        <div className="card-footer border-0">
                          <div className="card-header border-0 text-left">
                            {post.channel}
                          </div>
                          <Col className="mt-2 mx-2 mb-3">
                            <div />
                            <Link to={`/thread${post.idThread}`} style={{ color: 'black' }}>
                              <div className="card-footer">
                                <div />
                                {!post.text ? (
                                  null
                                ) : <p className="blockquote mb-0 text-left">{post.text}</p> }
                                {!post.photoUrl ? null : (
                                  <div>
                                    <Image className="card-header border-0" src={post.photoUrl} alt="" fluid />
                                  </div>
                                ) }
                              </div>
                            </Link>
                            <span>
                              <div>
                                <Button variant="outline-danger mt-2 h-50 m-0 p-0" as="input" type="submit" value="DELETE" size="small" onClick={() => { handleClick(post.idThread); }} className="pull-left border-0 z-depth-0" tabIndex="0" />
                                <span className="blockquote-footer text-muted pull-right" style={{ fontSize: '16px' }}>
                                  {`you, ${convertTime(post.createdAt)}`}
                                </span>
                              </div>
                            </span>
                          </Col>
                          <br />
                          <hr style={{
                            borderColor: 'black', marginTop: '10px', marginRight: '5px', marginLeft: '5px', borderWidth: '0.5',
                          }}
                          />
                        </div>
                      </Card>
                    ))
                  ) : null}
                </Col>
              </MDBCard>
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
  convertTime: PropTypes.func.isRequired,
  user: PropTypes.objectOf({
    idUser: PropTypes.number.isRequired,
    username: PropTypes.objectOf.isRequired,
    profilePhotoUrl: PropTypes.string.isRequired,
    scores: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default Profile;
