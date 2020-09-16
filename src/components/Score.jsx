import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
} from 'react-bootstrap';

const Score = ({ game }) => (
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
            <td>{score.createdAt.split('T')[0]}</td>
          </tr>
        )) : (
          <></>
        )}
    </tbody>
  </Table>
);
Score.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    scores: PropTypes.arrayOf({
      idScore: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Score;
