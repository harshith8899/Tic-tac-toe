import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const titleRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);
  const box5 = useRef(null);
  const box6 = useRef(null);
  const box7 = useRef(null);
  const box8 = useRef(null);
  const box9 = useRef(null);

  const box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src="${cross_icon}" alt="X">`;
      data[num] = "x";
      setCount(count + 1);
      titleRef.current.innerHTML = `${playerO}'s Turn (O)`; // Update title for next player
    } else {
      e.target.innerHTML = `<img src="${circle_icon}" alt="O">`;
      data[num] = "o";
      setCount(count + 1);
      titleRef.current.innerHTML = `${playerX}'s Turn (X)`; // Update title for next player
    }
    checkWin();
  };

  const checkWin = () => {
    // Checking for winner horizontally
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    }

    // Checking for winner vertically
    else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    }

    // Checking for winner diagonally
    else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }

    // Check for a draw
    else if (!data.includes("")) {
      won("draw");
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === 'x') {
      titleRef.current.innerHTML = `Congratulations, ${playerX} (<img src=${cross_icon}>) Won!`;
    } else if (winner === 'o') {
      titleRef.current.innerHTML = `Congratulations, ${playerO} (<img src=${circle_icon}>) Won!`;
    } else if (winner === 'draw') {
      titleRef.current.innerHTML = `It's a draw!`;
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `${playerX}'s Turn (X)`; // Reset to Player X's turn
    box_array.forEach((box) => {
      box.current.innerHTML = "";
    });
    setCount(0);
  };

  const restartGame = () => {
    // Reset all game states
    setPlayerX("");
    setPlayerO("");
    setGameStarted(false);
    setCount(0);
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    box_array.forEach((box) => {
      box.current.innerHTML = "";
    });
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerX && playerO) {
      setGameStarted(true);
      titleRef.current.innerHTML = `${playerX}'s Turn (X)`; // Start with Player X
    } else {
      alert("Please enter both player names!");
    }
  };

  return (
    <div>
      <div className="container">
        {!gameStarted ? (
          <div className="player-form">
            <h1 ref={titleRef}>Enter Player Names</h1>
            <form onSubmit={handleStartGame}>
              <input
                type="text"
                placeholder="Player X Name"
                value={playerX}
                onChange={(e) => setPlayerX(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Player O Name"
                value={playerO}
                onChange={(e) => setPlayerO(e.target.value)}
                required
              />
              
                <button type="submit">Start Game</button>
             
            </form>
          </div>
        ) : (
          <>
            <h1 className="title" ref={titleRef}>{`${playerX}'s Turn (X)`}</h1>
            <div className="board">
              <div className="row1">
                <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
                <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
                <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
              </div>
              <div className="row2">
                <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
                <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
                <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
              </div>
              <div className="row3">
                <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
                <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
                <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
              </div>
            </div>
            <div className="buttons">
              <button className="reset" onClick={reset}>Reset</button>
              <button className="restart" onClick={restartGame}>Restart</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;