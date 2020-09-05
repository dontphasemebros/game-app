import React from 'react';

//--------------------------------------------------------------------------

// Methods for obtaining information using AXIOS

//--------------------------------------------------------------------------
const highscores = [100, 23, 356, 234, 55];

const Profile = () => (
  <div style={{ marginLeft: '200px' }}>
    <div style={{ padding: '20px' }}>
      <div className="card text-white bg-secondary mb-3">
        <h2 className="card-header" style={{ minWidth: '700px' }}>
          My Profile
        </h2>
      </div>
    </div>
    <div className="username" style={{ textAlign: 'right' }}>
      <h2>Bobby</h2>
    </div>
    <div className="user-profile">
      <div className="user-high-scores scoreList card text-white bg-secondary mb-3" style={{ display: 'inline-block' }}>
        <h2>
          Bobbys Scores:
        </h2>
        {highscores.sort((a, b) => a - b).reverse().map((score) => (
          <div className="scoreList card text-white bg-secondary mb-3">
            <h4>
              Score:
            </h4>
            <h5>{score}</h5>
          </div>
        ))}
      </div>
      <div className="profile-picture text-white bg-dark mb-3 position-absolute" style={{ display: 'inline-block', alignSelf: 'flex-start' }}>
        <img className="d-print-inline-block" src="https://www.seti.org/sites/default/files/styles/original/public/2019-09/Zork%20alien%20head%20PPR.jpg?itok=T7eTYzCZ" height="500px" width="500px" alt="" style={{ display: 'inline-block' }} />
      </div>
      <div className="user-bio bg-light" style={{ minWidth: '700px' }}>
        <div style={{ padding: '20px' }}>
          <div className="card text-white bg-secondary mb-3">
            <h2 className="card-header" style={{ minWidth: '700px' }}>
              Bobby&apos;s Bio
            </h2>
          </div>
        </div>
        <h4>username: Bobby</h4>
        <h4>Location: somewhere</h4>
        <h4>Hi, I am bobby. I like games.</h4>
      </div>
    </div>

  </div>
);

export default Profile;
