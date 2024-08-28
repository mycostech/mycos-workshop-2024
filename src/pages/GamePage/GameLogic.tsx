import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMain } from '../../contexts/MainContext';
import ScoreboardButton from '../../components/ScoreboardButton';
import useTimer from '../../hooks/useTimer';
import BackgroundMusic from '../../components/BackgroundMusic';
interface IGameProps {
  onSubmitScores : (score : number) => void
  levels: number,
  stages : number
}

const Game: React.FC<IGameProps> = (props : IGameProps) => {
  const navigate = useNavigate()
  
  const {} = useMain()
  const {} = useTimer();
  const {levels, stages, onSubmitScores} = props;

  // Create state for contain final score (int)
  // Create state for contain is game finished (boolean)
  // Create state for contain ColorSpotGame

  // Create state for contain dot (string[])

  // Create state for contain a index of result dot (different color) in list (int).

  // Create state for contain is game over (boolean)

  const currentStage = useMemo(() => {
    //Return current stage  from ColorSpotGame
    return 1;
  }, []);

  const currentLevel = useMemo(() => {
    //Return current level from ColorSpotGame
    return 1;
  }, [])

  const bgSong = useMemo(() => {
    // return youtube url (sound)
    // example: https://www.youtube.com/watch?v=OCOeCrpRNGA
    return "https://www.youtube.com/watch?v=OCOeCrpRNGA"
  }, [/*gameOver, gameFinished*/])

  const submitScoreToServer = useCallback(async (score:number) => {
    // call submitScore()
   
  },[/*user, channel*/])

  const handleNextStage = useCallback(async() => {
    /*
      logic for check condition for fo to next stage
      if can go to next stage
      Set new dots and correct dots state.

      if can't go to next stage, That's mean you complete all level!!!!
      - Calculate score
      - set final score state and game finish state.
      - stop time
      - submit score 
    */
  }, [submitScoreToServer, /*time, stopTimer, setGameOver, setGameFinished, game,*/ onSubmitScores]);

  const handleDotClick = useCallback(async(index: number) => {
    /*
      Logic for check dot that user click.
      if select correct.
      Go to next stage.

      if select wrong, That's mean game over
      - Calculate score
      - set final score state.
      - stop time
      - update highest score
      - submit score
    */
  }, [handleNextStage, submitScoreToServer, /*time, stopTimer, dots, correctDot, setGameOver,*/]);

  const restartGame = useCallback(() => {
    /*
      Logic for restart game (When user play game again after game over)
      - create new ColorSpotGame
      - set new dots state and correct dot state
      - set game state
      - set game over state and game finished state to false
      - rest timer and start timer agein
    */
  }, [levels, stages, /*startTimer, resetTimer, setDots, setCorrectDot, setGameOver, setGameFinished, resetGame,*/ ])

  useEffect(() => {
    //When this component rendered.
    // call restartGeme() to reset everything.
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {
        /*
          Show Timer component
        */
      }
      <BackgroundMusic songUrl={bgSong} />
      <h1>Level {currentLevel}</h1>
      {
      // If game over or finish game 
      // Render summerize (score, button for restart game, button for go to score page)
      false ? (
        <div>
          {/* Show meesage when game finished or game over. */}
          <h3>Score : {'{{score}}'}</h3>
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
          {/* 
            // Render dot
          */}
        </>
      )}
    </div>
  );
};

export default Game;
