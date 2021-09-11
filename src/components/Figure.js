import React from 'react';
const Figure = (props) => {
  return (
    <svg width='300' height='320' className='figure'>
      <line x1='161' y1='25' x2='161' y2='49' />
      <line x1='163' y1='26' x2='60' y2='28' />
      <line x1='61' y1='26' x2='61' y2='316' />
      {props.wrongLetters.length > 0 && (
        <ellipse fill='white' cx='160' cy='77' id='svg_1' rx='25' ry='26' />
      )}
      {props.wrongLetters.length > 1 && (
        <line stroke='#ffffff' x1='157' y1='100' x2='157' y2='190' />
      )}
      {props.wrongLetters.length > 2 && (
        <line
          fill='none'
          stroke='#ffffff'
          x1='158'
          y1='130'
          x2='204'
          y2='107'
        />
      )}
      {props.wrongLetters.length > 3 && (
        <line
          y2='108'
          x2='113'
          y1='129'
          x1='157'
          stroke='#ffffff'
          fill='none'
        />
      )}
      {props.wrongLetters.length > 4 && (
        <line
          fill='none'
          stroke='#ffffff'
          x1='156'
          y1='188'
          x2='109'
          y2='229'
        />
      )}

      {props.wrongLetters.length > 5 && (
        <line
          fill='none'
          stroke='#ffffff'
          x1='157'
          y1='187'
          x2='189'
          y2='233'
        />
      )}
    </svg>
  );
};

export default Figure;
