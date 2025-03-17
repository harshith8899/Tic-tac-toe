import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => { // Changed function name to PascalCase

  let [count, setCount] = useState(0); // Fixed 'UseState' to 'useState'
  let [lock, setLock] = useState(false);

  const toggle = (e, num) => { // Added missing 'e' and 'num' parameters
    if (lock) {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src="${cross_icon}" alt="X">`; // Fixed incorrect string interpolation
      data[num] = "x";
      setCount(count + 1); // Avoid pre-increment operator
    } else {
      e.target.innerHTML = `<img src="${circle_icon}" alt="O">`; // Fixed incorrect string interpolation
      data[num] = "o";
      setCount(count + 1);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="title">Tic Tac Toe in <span>React</span></h1>
        <div className="board">
          <div className="row1"> 
            <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
          </div>
          
          <div className="row2"> 
            <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
          </div>
          
          <div className="row3"> 
            <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
            <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
          </div>
        </div>
        <button className="reset">Reset</button>
      </div>
    </div>
  );
};

export default TicTacToe; // Fixed export name
