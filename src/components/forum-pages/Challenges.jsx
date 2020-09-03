import React from 'react';
import { useForm } from 'react-hook-form';
import {
} from 'react-bootstrap';

const Challenges = ({ forEachChallenge }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => { console.log('ok'); };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <div className="card text-white bg-secondary mb-3">
          <h2 className="card-header">
            Challenges
          </h2>
        </div>
      </div>
      <div className="Challenges-Body">
        {forEachChallenge()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Start a discussion:</span>
          <input name="textarea" className="form-control" rows="3" ref={register} />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Challenges;
