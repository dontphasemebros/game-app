import React from 'react';

function Login() {
  return (
    <div className="d-flex flex-column" style={{ height: '64vh' }}>
      <br />
      <h1 className="d-flex justify-content-center">Choose A Login Method!</h1>
      <br />
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/api/google" role="button" style={{ textTransform: 'none' }}>
          <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
          Login with Google
        </a>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <a className="btn btn-outline-dark" href="/api" role="button" style={{ textTransform: 'none' }}>
          <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Discord sign-in" src="https://icon-library.com/images/discord-app-icon/discord-app-icon-15.jpg" />
          Login with Discord
        </a>
      </div>
      <br />
    </div>
  );
}

export default Login;
