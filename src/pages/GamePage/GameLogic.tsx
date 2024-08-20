import React, { useState } from 'react';

// Convert hex to HSL
const hexToHSL = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number = 0, s: number = 0
  const l: number = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const HSLToHex = (h: number, s: number, l: number): string => {
  // Normalize the input values
  h = h % 360; // Ensure h is within [0, 360)
  s = Math.max(0, Math.min(100, s)); // Clamp s between [0, 100]
  l = Math.max(0, Math.min(100, l)); // Clamp l between [0, 100]

  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r: number = 0, g: number = 0, b: number = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Adding a fallback mechanism in case the calculations yield unexpected NaN values
  if (isNaN(r)) r = 0;
  if (isNaN(g)) g = 0;
  if (isNaN(b)) b = 0;

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Function to generate a random color
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateDots = (level: number): {dots: string[], resultIdx: number} => {
  const baseColor = getRandomColor(); // Generate a random base color for the level
  const hsl = hexToHSL(baseColor); // Convert base color to HSL

  // Adjust lightness only, keeping hue and saturation consistent
  const lightnessDifference = Math.random() > 0.5 ? 10 : -10; // Randomly make the different color lighter or darker
  const diffColor = HSLToHex(hsl.h, hsl.s, Math.min(100, hsl.l + lightnessDifference)); // Ensure lightness stays within bounds

  const dots = Array(level * 4).fill(baseColor); // Generate an array of base color dots
  const randomIndex = Math.floor(Math.random() * dots.length);
  dots[randomIndex] = diffColor.toUpperCase(); // Replace one dot with the different color

  return {
    dots,
    resultIdx: randomIndex
  };
};

const Game: React.FC = () => {
  const [level, setLevel] = useState<number>(1);
  let {dots: dotList, resultIdx} = generateDots(level)

  const [dots, setDots] = useState<string[]>(dotList);
  const [idx, setIdx] = useState<number>(resultIdx)
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleDotClick = (index: number) => {
    console.log('dot, idx: ', dots, idx)
    if (dots[index] === dots[idx]) {
      setLevel(level + 1);
      let {dots: newDotList, resultIdx: newResultIdx} = generateDots(level + 1)
      setDots(newDotList);
      setIdx(newResultIdx)
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
            let {dots: newDotList, resultIdx: newResultIdx} = generateDots(1)
            setDots(newDotList);
            setIdx(newResultIdx)
            setGameOver(false);
          }}>Restart</button>
        </div>
      ) : (
        <>
          <h2>Level {level}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${level}, 50px)`, gap: '10px', justifyContent: 'center' }}>
            {dots.map((color, index) => {
              console.log("color: ", color)
              return (
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
            )})}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
