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
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
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
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((curr) => [...curr, letter]);
          } else {
            setNotification(true);
          }
        } else {
          if (wrongLetters.length === 5) {
            setPlayGame(false);
            setShowPopup(true);
            setWin(false);
          }
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((curr) => [...curr, letter]);
          } else {
            setNotification(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [playGame, randomWord, wrongLetters, correctLetters]);

  const playAgain = () => {};

  return (
    <div className='game'>
      {randomWord}
      <Figure wrongLetters={wrongLetters} />
      <div className='word-container'>
        <Word randomWord={randomWord} correctLetters={correctLetters} />
        {wrongLetters.length !== 0 && (
          <WrongLetters wrongLetters={wrongLetters} />
        )}
        {notification && <Notification />}
        {showPopup && <Popup win={win} />}
      </div>
    </div>
  );
};

export default Game;
