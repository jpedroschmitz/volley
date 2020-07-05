import { createContext, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';

export interface GameSet {
  teamAPoints: number;
  teamBPoints: number;
  winner?: string;
}

interface Team {
  name: string;
  numberOfWinSets?: number;
}

interface Teams {
  teamA: Team;
  teamB: Team;
}

interface Game {
  teams?: Teams;
  gameTime?: string;
  sets?: GameSet[];
  currentSetIndex?: number;
  matchWinner?: 'A' | 'B';
}

interface GameContextData {
  game: Game;
  createGame(game: Game): void;
  scorePoint(team: 'A' | 'B'): void;
  removeScorePoint(team: 'A' | 'B'): void;
}

const GameContext = createContext<GameContextData>({} as GameContextData);

export const GameProvider: React.FC<{}> = ({ children }) => {
  const [game, setGame] = useState<Game>({
    teams: {
      teamA: {
        name: '',
        numberOfWinSets: 0,
      },
      teamB: {
        name: '',
        numberOfWinSets: 0,
      },
    },
    gameTime: '',
    sets: [
      {
        teamAPoints: 0,
        teamBPoints: 0,
      },
    ],
    currentSetIndex: 0,
  });

  function createGame(createdGame: Game) {
    const auxCreatedGame = {
      ...game,
      ...createdGame,
    };

    setGame(auxCreatedGame);
    localStorage.setItem('@volley:game', JSON.stringify(auxCreatedGame));
  }

  function scorePoint(team: 'A' | 'B') {
    const { sets, currentSetIndex, teams } = game;

    const auxSets = [...sets];
    const teamAPoints = auxSets[currentSetIndex].teamAPoints;
    const teamBPoints = auxSets[currentSetIndex].teamBPoints;

    const setPointLimit = currentSetIndex === 4 ? 15 : 25;

    if (team === `A`) {
      const numberOfPoints = teamAPoints + 1;

      if (hasTeamAWinSet(numberOfPoints, teamBPoints, setPointLimit)) {
        if (teams.teamA.numberOfWinSets + 1 === 3) {
          confirmWinMatch('A');
          return;
        }

        confirmSetEnd('A');
        return;
      }

      auxSets[currentSetIndex].teamAPoints = numberOfPoints;
    } else {
      const numberOfPoints = teamBPoints + 1;

      if (hasTeamBWinSet(teamAPoints, numberOfPoints, setPointLimit)) {
        if (teams.teamB.numberOfWinSets + 1 === 3) {
          confirmWinMatch('B');
          return;
        }

        confirmSetEnd('B');
        return;
      }

      auxSets[currentSetIndex].teamBPoints = numberOfPoints;
    }

    setGame({
      ...game,
      sets: auxSets,
    });
  }

  function removeScorePoint(team: 'A' | 'B') {
    const { sets, currentSetIndex } = game;

    const auxSets = [...sets];

    if (team === `A`) {
      const numberOfPoints = auxSets[currentSetIndex].teamAPoints - 1;
      if (numberOfPoints < 0) return;

      auxSets[currentSetIndex].teamAPoints = numberOfPoints;
    } else {
      const numberOfPoints = auxSets[currentSetIndex].teamBPoints - 1;
      if (numberOfPoints < 0) return;

      auxSets[currentSetIndex].teamBPoints = numberOfPoints;
    }

    setGame({
      ...game,
      sets: auxSets,
    });
  }

  function startNextSet(winner: 'A' | 'B') {
    const { sets, teams, currentSetIndex } = game;
    const auxSets = [...sets];
    const auxTeams = { ...teams };

    auxSets[currentSetIndex].winner = winner;

    const teamAWins = auxTeams.teamA.numberOfWinSets;
    const teamBWins = auxTeams.teamB.numberOfWinSets;

    if (winner === 'A') {
      const wonSets = teamAWins + 1;
      auxSets[currentSetIndex].teamAPoints += 1;
      auxTeams.teamA.numberOfWinSets = wonSets;
    } else {
      const wonSets = teamBWins + 1;
      auxSets[currentSetIndex].teamBPoints += 1;
      auxTeams.teamB.numberOfWinSets = wonSets;
    }

    auxSets.push({
      teamAPoints: 0,
      teamBPoints: 0,
    });

    setGame({
      ...game,
      currentSetIndex: currentSetIndex + 1,
      teams: auxTeams,
      sets: [...auxSets],
    });
  }

  function hasTeamAWinSet(
    teamAPoints: number,
    teamBPoints: number,
    limit: number
  ) {
    const teamAHas25orMorePoints = teamAPoints >= limit;
    const teamAHas2orMorePointThenTeamB = teamAPoints > teamBPoints + 1;
    return teamAHas25orMorePoints && teamAHas2orMorePointThenTeamB;
  }

  function hasTeamBWinSet(
    teamAPoints: number,
    teamBPoints: number,
    limit: number
  ) {
    const teamBHas25orMorePoints = teamBPoints >= limit;
    const teamBHas2orMorePointThenTeamA = teamBPoints > teamAPoints + 1;
    return teamBHas25orMorePoints && teamBHas2orMorePointThenTeamA;
  }

  function confirmWinMatch(team: 'A' | 'B') {
    confirmAlert({
      title: 'End the game?',
      message: `${
        team === `A` ? game.teams.teamA.name : game.teams.teamB.name
      } won the match!`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => endGame(team),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function confirmSetEnd(team: 'A' | 'B') {
    confirmAlert({
      title: `End set ${game.currentSetIndex + 1}?`,
      message: `${
        team === `A` ? game.teams.teamA.name : game.teams.teamB.name
      } won this set!`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => startNextSet(team),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function endGame(team: 'A' | 'B') {
    startNextSet(team);

    setGame({
      ...game,
      matchWinner: team,
    });
  }

  return (
    <GameContext.Provider
      value={{ createGame, game, scorePoint, removeScorePoint }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
