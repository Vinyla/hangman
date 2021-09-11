import React from 'react';

const Word = (props) => {
  return (
    <div className='word'>
      {props.randomWord
        .split('')
        .map((letter) => (props.correctGuesses.includes(letter) ? letter : ' _'))}
    </div>
  );
};

export default Word;
