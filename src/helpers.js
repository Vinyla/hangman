export function checkWin(random, correct, guesses) {
  let status = 'win';
  random.split('').forEach((letter) => {
    if (!correct.includes(letter)) {
      status = '';
    }
  });
  if (guesses === 6) {
    status = 'lose';
  }
  return status
}
