import React from 'react';
import { useForm } from 'react-hook-form';

const GeneralDiscussion = ({ forEachDiscussion }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => { alert(data); };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <div className="card text-white bg-secondary mb-3">
          <h2 className="card-header">
            General Discussion
          </h2>
        </div>
      </div>
      <div className="GeneralDiscussion-Body">
        {forEachDiscussion()}
      </div>
      <div className="createForum">
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>Start a discussion:</span>
          <input name="textarea" className="form-control" rows="3" ref={register} />

          <input style={{ textAlign: 'right' }} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default GeneralDiscussion;
