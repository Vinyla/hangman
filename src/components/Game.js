import React, { useState, useEffect } from 'react';
import Figure from './Figure';
import Word from './Word';
import WrongLetters from './WrongLetters';
import Notification from './Notification';
import Popup from './Popup';
import axios from 'axios';

const Game = () => {
  const [randomWord, setRandomWord] = useState('');
  const [playGame, setPlayGame] = useState(true);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const [notification, setNotification] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    axios
      .get('https://random-words-api.vercel.app/word')
      .then((response) => {
        const wordUpperCase = response.data[0].word.toUpperCase();
        setRandomWord(wordUpperCase);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      setNotification(false);
      const { key, keyCode } = event;
      if (playGame && keyCode >= 65 && keyCode <= 90) {
        let letter = key.toUpperCase();
        if (randomWord.includes(letter)) {
          if (!correctGuesses.includes(letter)) {
            setCorrectGuesses((curr) => [...curr, letter]);
          } else {
            setNotification(true);
          }
        } else {
          if (!wrongGuesses.includes(letter)) {
            setWrongGuesses((curr) => [...curr, letter]);
            setNumberOfGuesses(numberOfGuesses + 1);
          } else {
            setNotification(true);
          }
        }
      }
    };
    const checkWin = () => {
      setWin(true);
      setShowPopup(true);
      setPlayGame(false);
      randomWord.split('').forEach((letter) => {
        if (!correctGuesses.includes(letter)) {
          setWin(false);
          setShowPopup(false);
          setPlayGame(true);
        }
      });
      if (numberOfGuesses === 6) {
        setShowPopup(true);
        setWin(false);
        setPlayGame(false);
      }
    };
    checkWin();
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
    
  }, [playGame, randomWord, correctGuesses, wrongGuesses, numberOfGuesses]);

  const playAgain = () => {
    window.location.reload();
  };

  return (
    <div className='game'>
      <Figure wrongGuesses={wrongGuesses} />
      <div className='word-container'>
        <Word randomWord={randomWord} correctGuesses={correctGuesses} />
        {wrongGuesses.length !== 0 && (
          <WrongLetters wrongGuesses={wrongGuesses} />
        )}
        {notification && <Notification />}
        {showPopup && (
          <Popup randomWord={randomWord} win={win} playAgain={playAgain} />
        )}
      </div>
    </div>
  );
};

export default Game;
