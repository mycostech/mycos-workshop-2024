import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zoom } from '@mui/material';

import { useMain } from '../../contexts/MainContext';
import ScoreboardButton from '../../components/ScoreboardButton';
import ColorSpotGame from './core/ColorSpotGame';
import Timer from '../../components/Timer';
import useTimer from '../../hooks/useTimer';
import BackgroundMusic from '../../components/BackgroundMusic';
import { submitScore } from '../../api/appScore'

interface IGameProps {
  onSubmitScores : (score : number) => void
  levels: number,
  stages : number
}

const Game: React.FC<IGameProps> = (props : IGameProps) => {
  const navigate = useNavigate()
  const { channel, user } = useMain()
  const { time, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer();
  const {levels, stages, onSubmitScores} = props;

  const [finalScore, setFinalScore] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [game, resetGame] = useState(new ColorSpotGame(levels, stages));

  const [dots, setDots] = useState<string[]>([]);
  const [correctDot, setCorrectDot] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const currentStage = useMemo(() => {
    return game.getCurrentStage();
  }, [game.getCurrentStage()]);

  const currentLevel = useMemo(() => {
    return game.getCurrentLevel();
  }, [game.getCurrentLevel()])

  const bgSong = useMemo(() => {
    if (gameFinished) {
      return 'https://www.youtube.com/watch?v=OCOeCrpRNGA';
    } else if (gameOver) {
      return 'https://www.youtube.com/watch?v=Hs7dYjkagxk';
    }
    return 'https://www.youtube.com/watch?v=BS5Q6cZMIM8';
  }, [gameOver, gameFinished])

  const submitScoreToServer = useCallback(async (score:number) => {
    try {
      await submitScore({
        appName: channel!,
        userName: user!,
        score
      })
    } catch (error) {
      console.error(error)
      alert("Error to submit score to server.")
    }
  },[user, channel])

  const handleNextStage = useCallback(async() => {
    if (game.nextStage()) {
      const { dots: newDotList, resultIdx: newResultIdx } = game.getGameNextLevel();
      setDots(newDotList);
      setCorrectDot(newResultIdx)
    } else {
      setGameOver(true);
      // Submit calculated score.
      const score = game.getScore(Math.floor((time % 60000) / 1000));
      setFinalScore(score);
      setGameFinished(true);
      stopTimer();
      onSubmitScores(score);
    }
  }, [game, time, setGameOver, submitScoreToServer, setGameFinished, stopTimer, onSubmitScores]);

  const handleDotClick = useCallback(async(index: number) => {
    // console.log('dot, idx: ', dots, idx)
    if (dots[index] === dots[correctDot]) {
      handleNextStage();
    } else {
      setGameOver(true);
      // Submit calculated score.
      const score = game.getScore(Math.floor((time % 60000) / 1000));
      setFinalScore(score);
      stopTimer();
      onSubmitScores(score);
      submitScoreToServer(score)
    }
  }, [handleNextStage, dots, time, setGameOver, stopTimer, correctDot, submitScoreToServer]);

  const restartGame = useCallback(() => {
    const newGame = new ColorSpotGame(levels, stages);
    const { dots: newDotList, resultIdx: newResultIdx } = newGame.getGameNextLevel();
    setDots(newDotList);
    setCorrectDot(newResultIdx)
    resetGame(newGame);
    setGameOver(false);
    setGameFinished(false);
    resetTimer();
    startTimer();
  }, [resetGame, setDots, setCorrectDot, setGameOver, setGameFinished, startTimer, resetTimer, levels, stages])

  useEffect(() => {
    restartGame();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <Timer time={time} />
      <BackgroundMusic songUrl={bgSong} />
      <h1>Level {currentLevel}</h1>
      {gameOver || gameFinished ? (
        <div>
          <h2>{gameFinished ? 'Congratulation You have Completed All Levels' : `Game Over! You reached only stage ${currentStage} of level ${currentLevel}`}</h2>
          <h3>Score : {finalScore}</h3>
          <button onClick={restartGame}>Restart</button>
          <br />
          <br />
          <ScoreboardButton
            onScoreboardClick={() => {
              navigate('/score')
            }}
          />
        </div>
      ) : (
        <>
          <h2>Stage {currentStage}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.sqrt(dots.length)}, 50px)`, gap: '10px', justifyContent: 'center' }}>
            {dots.map((color, index) => {
              // console.log("color: ", color)
              return (
                <Zoom in={true} key={index}>
                  <div

                    onClick={() => handleDotClick(index)}
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: color,
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                  ></div>
                </Zoom>

              )
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
