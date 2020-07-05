import React, { useContext } from 'react';

import Layout from '../components/Layout';
import Score from '../components/Score';
import GameContext from '../context/game';

export default function Scoreboard() {
  const {
    game: {
      teams: { teamA, teamB },
      gameTime,
      sets,
      currentSetIndex,
      matchWinner,
    },
  } = useContext(GameContext);

  return (
    <Layout
      title={`${teamA.name} vs ${teamB.name}`}
      description={`Game start at ${gameTime}`}
    >
      {matchWinner && (
        <div className="winner">
          {matchWinner === `A` ? teamA.name : teamB.name} won the match!
        </div>
      )}

      <div className="flex">
        <Score
          team="A"
          score={sets[currentSetIndex].teamAPoints}
          teamName={teamA.name}
          wonSets={sets.filter((set) => set.winner === 'A')}
          setsWin={teamA.numberOfWinSets}
        />
        <Score
          team="B"
          score={sets[currentSetIndex].teamBPoints}
          teamName={teamB.name}
          wonSets={sets.filter((set) => set.winner === 'B')}
          setsWin={teamB.numberOfWinSets}
        />
      </div>
      <style jsx>{`
        .winner {
          background: #04d461;
          border-radius: 5px;
          width: 100%;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
        }

        .flex {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
        }

        @media (max-width: 600px) {
          .flex {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  );
}
