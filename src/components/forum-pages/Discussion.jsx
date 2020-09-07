import React from 'react';
import { useForm } from 'react-hook-form';
import {
} from 'react-bootstrap';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Replies from './Replies';

const Discussion = ({ forEachDiscussion, threads }) => {
  const { register, handleSubmit } = useForm();

  const discussion = [forEachDiscussion()];

  const onSubmit = () => { };
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/replies">
            <div className="Thread-Replies" style={{ padding: '20px' }}>
              <Replies threads={threads} discussion={discussion[0]} />
            </div>
            <div className="Challenges-Body">
              <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '30px', marginLeft: '200px' }}>
                <span>Start a Reply:</span>
                <input name="textarea" className="form-control" rows="3" ref={register} />
                <input type="submit" />
              </form>
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

Discussion.propTypes = {
  forEachDiscussion: PropTypes.func.isRequired,
  threads: PropTypes.arrayOf.isRequired,
};

export default Discussion;
