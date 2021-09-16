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
  const [notification, setNotification] = useState(false);

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
    setNotification(false);
    console.log(randomWord);
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playGame && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toUpperCase();
        if (randomWord.includes(letter)) {
          if (!correctGuesses.includes(letter)) {
            setCorrectGuesses((curr) => [...curr, letter]);
          } else {
            setNotification(true);
          }
        } else {
          if (!wrongGuesses.includes(letter)) {
            setWrongGuesses((curr) => [...curr, letter]);
          } else {
            setNotification(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctGuesses, wrongGuesses, playGame, randomWord]);

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
        <Popup
          randomWord={randomWord}
          correctGuesses={correctGuesses}
          wrongGuesses={wrongGuesses}
          setPlayGame={setPlayGame}
          playAgain={playAgain}
        />
      </div>
    </div>
  );
};

export default Game;
