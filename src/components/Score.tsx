import React, { useContext } from 'react';

import GameContext, { GameSet } from '../context/game';
import Arrow from './icons/Arrow';

interface Score {
  score: number;
  teamName: string;
  setsWin: number;
  wonSets: GameSet[];
  team: 'A' | 'B';
}

export default function Score({
  score,
  setsWin,
  teamName,
  wonSets,
  team,
}: Score) {
  const { removeScorePoint, scorePoint } = useContext(GameContext);

  return (
    <div className="wrap">
      <div className="flex">
        <h3 className="score">{score}</h3>

        <div className="help">
          <span className="box sets">{setsWin}</span>
          <button
            type="button"
            aria-label="Adicionar ponto"
            className="box"
            onClick={() => scorePoint(team)}
          >
            <Arrow />
          </button>
          <button
            type="button"
            aria-label="Remover ponto"
            className="box"
            onClick={() => removeScorePoint(team)}
          >
            <Arrow style={{ transform: `rotate(180deg)` }} />
          </button>
        </div>

        <div className="sets-score">
          {wonSets &&
            wonSets.map((set) => (
              <p key={`${set.teamAPoints}x${set.teamBPoints}-${set.winner}`}>
                {set.teamAPoints} x {set.teamBPoints}
              </p>
            ))}
        </div>
      </div>
      <style jsx>{`
        .wrap {
          text-align: center;
          position: relative;
        }

        .flex {
          display: grid;
          grid-auto-flow: column;
          align-items: center;
        }

        .wrap:first-child .flex .sets-score {
          grid-column-start: 1;
        }

        .wrap:first-child .flex .score {
          grid-column-start: 3;
        }

        .help button {
          cursor: pointer;
        }

        .help button:hover {
          border-color: #0070f3;
        }

        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          border-radius: 5px;
          background: none;
          border: 1px solid #eaeaea;
        }

        .box.sets {
          background: #f8f8f8;
        }

        .box:not(:last-child) {
          margin-bottom: 8px;
        }

        .sets-score {
          padding: 0 16px;
        }

        .sets-score p {
          border: 1px solid #eaeaea;
          border-radius: 5px;
          background: #f8f8f8;
          padding: 4px;
          width: 75px;
          margin: 0 auto;
        }

        .sets-score p:not(:last-child) {
          margin: 0 auto 8px auto;
        }

        .score {
          width: 120px;
          height: 120px;
          box-sizing: border-box;
          margin: 1rem;
          padding: 1.5rem;
          text-align: center;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          font-size: 2.5rem;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .score:hover,
        .score:focus,
        .score:active {
          color: #0070f3;
          border-color: #0070f3;
        }
      `}</style>
    </div>
  );
}
