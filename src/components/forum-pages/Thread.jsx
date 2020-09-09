import React, { useState, useEffect } from 'react';
import {
  useParams,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const { getThreadReplies, submitReply } = require('../../helpers/helpers.js');

const Thread = ({ user }) => {

};

Thread.propTypes = {
  user: PropTypes.objectOf.isRequired,
};

export default Thread;
