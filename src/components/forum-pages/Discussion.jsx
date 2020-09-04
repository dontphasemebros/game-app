import React from 'react';
import { useForm } from 'react-hook-form';
import {
} from 'react-bootstrap';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import Replies from './Replies';

const Discussion = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => { };
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <div className="Thread-Replies" style={{ padding: '20px' }}>
            <Route path="/replies">
              <Replies />
            </Route>
          </div>
          <div className="Challenges-Body">
            <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '30px', marginLeft: '200px' }}>
              <span>Start a Reply:</span>
              <input name="textarea" className="form-control" rows="3" ref={register} />
              <input type="submit" />
            </form>
          </div>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Discussion;
