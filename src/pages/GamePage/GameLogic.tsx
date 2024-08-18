import React, { useState } from 'react';

// Function to generate a random color
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getColorDifference = (): number => {
  //Math.floor(Math.random() * 20) + 1; // Random color variation
  return Math.floor(Math.random() * 11) + 20; // Generates a random number between 20 and 30
};

const generateDots = (level: number): string[] => {
  const baseColor = getRandomColor(); // Base color for the dots
  const colorDifference = getColorDifference();
  const diffColor = `#${(parseInt(baseColor.slice(1), 16) + colorDifference).toString(16)}`;
  const dots = Array(level * 4).fill(baseColor); // Generate an array of base color dots
  const randomIndex = Math.floor(Math.random() * dots.length);
  dots[randomIndex] = diffColor; // Replace one dot with the different color

  return dots;
};

const Game: React.FC = () => {
  const [level, setLevel] = useState<number>(1);
  const [dots, setDots] = useState<string[]>(generateDots(level));
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleDotClick = (index: number) => {
    if (dots[index] !== dots[0]) {
      setLevel(level + 1);
      setDots(generateDots(level + 1));
    } else {
      setGameOver(true);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Color Spot Game</h1>
      {gameOver ? (
        <div>
          <h2>Game Over! You reached level {level}</h2>
          <button onClick={() => {
            setLevel(1);
            setDots(generateDots(1));
            setGameOver(false);
          }}>Restart</button>
        </div>
      ) : (
        <>
          <h2>Level {level}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${level}, 50px)`, gap: '10px', justifyContent: 'center' }}>
            {dots.map((color, index) => (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: color,
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
