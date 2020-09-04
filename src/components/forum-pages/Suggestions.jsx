import React from 'react';
import { useForm } from 'react-hook-form';
import {
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Suggestions = ({ forEachSuggestion }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => { };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <div className="card text-white bg-secondary mb-3">
          <h2 className="card-header">
            Suggestions
          </h2>
        </div>
      </div>
      <div className="Suggestions-Body">
        {forEachSuggestion()}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span>Start a discussion:</span>
        <input name="textarea" className="form-control" rows="3" ref={register} />
        <input type="submit" name="Submit Discussion" />
      </form>
    </div>
  );
};

Suggestions.propTypes = {
  forEachSuggestion: PropTypes.func.isRequired,
};

export default Suggestions;
