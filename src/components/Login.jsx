import React from 'react';
import { Button } from 'react-bootstrap';

function Login() {
  return (
    <div>
      <h1>Pick One</h1>
      <br />
      <Button href="/api/google" variant="primary" size="lg">
        <h6>Google</h6>
      </Button>
      <br />
      <Button href="/api" variant="secondary" size="lg">
        <h6>Discord</h6>
      </Button>
    </div>
  );
}

export default Login;
