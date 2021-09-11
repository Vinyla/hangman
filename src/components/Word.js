import React from 'react';

const Word = (props) => {
 return (
   <div className='word'>
     {props.randomWord.split('').map((letter, i) => {
       return (
         <span key={i}>
           {props.correctLetters.includes(letter) ? letter : ''}
         </span>
       );
     })}
   </div>
 );
}

export default Word;