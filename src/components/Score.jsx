import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'react-bootstrap';

const Score = ({ game }) => {
  const convertTime = (timestamp) => {
    const timeConfig = { dateStyle: 'short', timeStyle: 'short' };
    const convertedTs = new Date(timestamp);
    const duration = new Date().getTime() - convertedTs;
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor((duration / (1000 * 60 * 60 * 24)));

    if (days === 0 && hours === 0 && minutes === 0) {
      return seconds < 10 ? 'just now' : `${seconds} seconds ago`;
    } if (days === 0 && hours === 0 && minutes !== 0) {
      return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
    } if (days === 0 && hours < 24) {
      return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
    }
    return `${convertedTs.toLocaleString(undefined, timeConfig)}`;
  };

  return (
    <Table borderless striped size="sm">
      <thead>
        <tr>
          <th colSpan="3" className="text-center">
            <a href={game.href} style={{ fontSize: '18px', color: 'blue' }}>
              {game.name}
            </a>
          </th>
        </tr>
        {game.scores.length
          ? (
            <tr className="text-left">
              <th>Score</th>
              <th>Player</th>
              <th>Date</th>
            </tr>
          ) : (
            <tr>
              <th colSpan="3" className="text-center">
                <a href={game.href}>
                  {`Play ${game.name} to get on the leaderboard!`}
                </a>
              </th>
            </tr>
          )}
      </thead>
      <tbody className="text-left">
        {game.scores.length
          ? game.scores.map((score) => (
            <tr key={score.idScore}>
              <td>{score.value}</td>
              <td>{score.username}</td>
              <td>{convertTime(score.createdAt)}</td>
            </tr>
          )) : (
            <></>
          )}
      </tbody>
    </Table>
  );
};

Score.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    scores: PropTypes.arrayOf({
      idScore: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Score;
