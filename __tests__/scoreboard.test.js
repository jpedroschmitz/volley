import React from 'react';
import { render, screen } from '@testing-library/react';

import GameContext from '../src/context/game';
import Scoreboard from '../src/pages/scoreboard';

function renderScoreboard(game) {
  return render(
    <GameContext.Provider value={game}>
      <Scoreboard />
    </GameContext.Provider>
  );
}

const scoreboardValue = {
  game: {
    teams: {
      teamA: { name: 'Time 1', numberOfWinSets: 3 },
      teamB: { name: 'Time 2', numberOfWinSets: 0 },
    },
    gameTime: '19h',
    sets: [
      { teamAPoints: 25, teamBPoints: 1, winner: 'A' },
      { teamAPoints: 25, teamBPoints: 2, winner: 'A' },
      { teamAPoints: 25, teamBPoints: 3, winner: 'A' },
    ],
    currentSetIndex: 2,
    matchWinner: 'A',
  },
};

test('it should render the teams names', () => {
  renderScoreboard(scoreboardValue);
  const teamsNamesElement = screen.getByText(/Time 1 vs Time 2/);

  expect(teamsNamesElement).toBeInTheDocument();
});

test('it should render the game time', () => {
  renderScoreboard(scoreboardValue);
  const gameTimeElement = screen.getByText(/Game start at 19h/);

  expect(gameTimeElement).toBeInTheDocument();
});

test('it should render the winner', () => {
  renderScoreboard(scoreboardValue);
  const winnerBox = screen.getByText(/Time 1 won the match!/);

  expect(winnerBox).toBeInTheDocument();
});
