import React, { useEffect } from 'react';
import { checkWin } from '../helper';

const Popup = (props) => {
  let message = '';
  let revealWord = '';
  let playable = true;

  if (
    checkWin(props.correctGuesses, props.wrongGuesses, props.randomWord) ===
    'win'
  ) {
    message = 'Congratulations! You won!';
    playable = false;
  } else if (
    checkWin(props.correctGuesses, props.wrongGuesses, props.randomWord) ===
    'lose'
  ) {
    message = 'Unfortunately you lost.';
    revealWord = `...the word was: ${props.randomWord}`;
    playable = false;
  }

  useEffect(() => {
    props.setPlayGame(playable);
  }, [playable, props]);

  return (
    <div
      className='popup-container'
      style={message !== '' ? { display: 'flex' } : {}}
    >
      <div className='popup'>
        <p>{message}</p>
        <p>{revealWord}</p>
        <button onClick={props.playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
