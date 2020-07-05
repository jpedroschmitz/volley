import React, { useState, useContext, FormEvent } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';

import Layout from '../components/Layout';
import GameContext from '../context/game';

export default function Home() {
  const { createGame } = useContext(GameContext);

  const [teamA, setTeamA] = useState<string>('');
  const [teamB, setTeamB] = useState<string>('');
  const [gameTime, setGameTime] = useState<string>('');

  function handleFormSubmit(e: FormEvent): void {
    e.preventDefault();

    if (!teamA || !teamB || !gameTime) {
      toast.error('All fields are required!');
      return;
    }

    if (teamA === teamB) {
      toast.error('Teams names are equal!');
      return;
    }

    createGame({
      gameTime,
      teams: {
        teamA: {
          name: teamA,
          numberOfWinSets: 0,
        },
        teamB: {
          name: teamB,
          numberOfWinSets: 0,
        },
      },
    });

    Router.push('/scoreboard');
  }

  return (
    <Layout
      title="Welcome to Volley!"
      description="Scoreboard for volleyball games!"
    >
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Team A"
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
        />
        <input
          type="text"
          placeholder="Team B"
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
        />
        <input
          type="text"
          placeholder="Game Time"
          value={gameTime}
          onChange={(e) => setGameTime(e.target.value)}
        />
        <button type="submit">Start</button>
      </form>
      <style jsx>{`
        form {
          max-width: 340px;
          width: 100%;

          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        input,
        button {
          width: 100%;
          outline: none;
          border: none;
          background: none;
          border-radius: 5px;
          padding: 12px;
        }

        input {
          background: #f8f8f8;
          margin-bottom: 16px;
        }

        button {
          cursor: pointer;
          background: #0070f3;
          color: #fff;
        }
      `}</style>
    </Layout>
  );
}
