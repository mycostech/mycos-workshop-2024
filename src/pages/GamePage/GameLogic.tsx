import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMain } from '../../contexts/MainContext';
import ScoreboardButton from '../../components/ScoreboardButton';
import useTimer from '../../hooks/useTimer';
import BackgroundMusic from '../../components/BackgroundMusic';
import ColorSpotGame from './core/ColorSpotGame';
import { submitScore } from '../../api/appScore';
import Timer from '../../components/Timer';
import { Zoom } from '@mui/material';
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

  // TO DO:
  // Create state for contain final score (int)
  const [finalScore, setFinalScore] = useState<number>(0);

  // Create state for contain is game finished (boolean)
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // Create state for contain ColorSpotGame
  const [game, resetGame] = useState(new ColorSpotGame(levels, stages));

  // Create state for contain dot (string[])
  const [dots, setDots] = useState<string[]>([]);

  // Create state for contain a index of result dot (different color) in list (int).
  const [correctDot, setCorrectDot] = useState<number>(0);

  // Create state for contain is game over (boolean)
  const [gameOver, setGameOver] = useState<boolean>(false);

  const currentStage = useMemo(() => {
    // TO DO:
    //Return current stage  from ColorSpotGame
    return game.getCurrentStage();
  }, [game.getCurrentStage()]);

  const currentLevel = useMemo(() => {
    // TO DO:
    //Return current level from ColorSpotGame
    return game.getCurrentLevel();
  }, [game.getCurrentLevel()])

  const bgSong = useMemo(() => {
    // TO DO:
    // return youtube url (sound)
    // example: https://www.youtube.com/watch?v=OCOeCrpRNGA
    if (gameFinished) {
      return 'https://www.youtube.com/watch?v=OCOeCrpRNGA';
    } else if (gameOver) {
      return 'https://www.youtube.com/watch?v=Hs7dYjkagxk';
    }
    return 'https://www.youtube.com/watch?v=BS5Q6cZMIM8';
  }, [gameOver, gameFinished])

  const submitScoreToServer = useCallback(async (score:number) => {
    // TO DO:
    // call submitScore()
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
    // TO DO:
    // logic for check condition for fo to next stage
    // if can go to next stage
    if (game.nextStage()) {
      // Set new dots and correct dots state.
      const { dots: newDotList, resultIdx: newResultIdx } = game.getGameNextLevel();
      setDots(newDotList);
      setCorrectDot(newResultIdx)
    } else {
      // if can't go to next stage, That's mean you complete all level!!!!
      // - Calculate score
      // - set final score state and game finish state.
      // - stop time
      // - submit score
      setGameOver(true);
      const score = game.getScore(Math.floor((time % 60000) / 1000));
      setFinalScore(score);
      setGameFinished(true);
      stopTimer();
      onSubmitScores(score);
    }
    
  }, [submitScoreToServer, time, stopTimer, setGameOver, setGameFinished, game, onSubmitScores]);

  const handleDotClick = useCallback(async(index: number) => {
    // TO DO:
    // Logic for check dot that user click.
    // if select correct.
    if (dots[index] === dots[correctDot]) {
      // Go to next stage.
      handleNextStage();
    } else {
      // if select wrong, That's mean game over
      // - Calculate score
      // - set final score state.
      // - stop time
      // - update highest score
      // - submit score
      setGameOver(true);
      const score = game.getScore(Math.floor((time % 60000) / 1000));
      setFinalScore(score);
      stopTimer();
      onSubmitScores(score);
      submitScoreToServer(score)
    }
  }, [handleNextStage, submitScoreToServer, time, stopTimer, dots, correctDot, setGameOver,]);

  const restartGame = useCallback(() => {
    // TO DO:

    // Logic for restart game (When user play game again after game over)
    // - create new ColorSpotGame
    const newGame = new ColorSpotGame(levels, stages);

    // - set new dots state and correct dot state
    const { dots: newDotList, resultIdx: newResultIdx } = newGame.getGameNextLevel();
    setDots(newDotList);
    setCorrectDot(newResultIdx)

    // - set game state
    resetGame(newGame);

    // - set game over state and game finished state to false
    setGameOver(false);
    setGameFinished(false);

    // - rest timer and start timer agein
    resetTimer();
    startTimer();
  }, [levels, stages, startTimer, resetTimer, setDots, setCorrectDot, setGameOver, setGameFinished, resetGame, ])

  useEffect(() => {
    // TO DO:
    //When this component rendered.
    // call restartGeme() to reset everything.
    restartGame();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {
        // TO DO:
        /*
          Show Timer component
        */
        <Timer time={time} />
      }
      <BackgroundMusic songUrl={bgSong} />
      <h1>Level {currentLevel}</h1>
      {
        // TO DO:
        // If game over or finish game 
        // Render summerize (score, button for restart game, button for go to score page)
        gameOver || gameFinished  ? (
        <div>
          {
            /* Show meesage when game finished or game over. */
            <h2>{gameFinished ? 'Congratulation You have Completed All Levels' : `Game Over! You reached only stage ${currentStage} of level ${currentLevel}`}</h2>
          }
          
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
        //else render dot
        <>
          <h2>Stage {currentStage}</h2>
          {
            /* 
              // TO DO:
              // Render dot
            */
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
          }
        </>
      )}
    </div>
  );
};

export default Game;
