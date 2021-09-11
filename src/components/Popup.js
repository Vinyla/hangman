import React from 'react';

const Popup = (props) => {
    return (
      <div>
        {!props.win && (
          <div className='popup'>
            <p>Unfortunately you lost.</p>
            <p>...the word was: {props.randomWord}</p>
            <button>Play Again</button>
          </div>
        )}
        {props.win && (
          <div className='popup'>
            <p>Congratulations! You won!</p>
            <button>Play Again</button>
          </div>
        )}
      </div>
    );
};

export default Popup;
