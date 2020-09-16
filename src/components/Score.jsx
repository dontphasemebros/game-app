import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Table,
} from 'react-bootstrap';

const CustomTable = styled.div`
  padding: 0px;
`;

const Score = ({ game }) => (
  <CustomTable>
    <Table borderless striped size="sm">
      <thead>
        <tr>
          <th colSpan="3" className="text-center">
            <a href={game.href}>
              {game.name}
            </a>
          </th>
        </tr>
        {game.scores.length
          ? (
            <tr>
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
      <tbody>
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
  </CustomTable>
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
