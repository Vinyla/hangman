import React from 'react';

const WrongLetters = (props) => {
  return (
    <div className='wrong-letters'>
      <p>Wrong letters:</p>&nbsp;
      {props.wrongGuesses
        .map((letter, i) => (
          <span className='letters' key={i}>
            {letter}
          </span>
        ))
        .reduce((prev, curr) => (prev === null ? [curr] : [prev, curr]), null)}
    </div>
  );
};

export default WrongLetters;
