import React from 'react';

const Word = (props) => {
  return (
    <div className='word'>
      {props.randomWord.split('').map((letter, i) => {
        return (
          <span className='letter' key={i}>
            {props.correctGuesses.includes(letter) ? letter : ''}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
