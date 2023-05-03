export const generateTokenSymbol = (str: string) => {
  const firstLetter = str[0].toUpperCase();
  const lastLetter = str[str.length - 1].toUpperCase();
  const middleLetter = str[getRandomInt(str.length)].toUpperCase()
    ? str[getRandomInt(str.length)].toUpperCase()
    : str[getRandomInt(str.length)];
  const length = str.length;
  return `${firstLetter}${middleLetter}${lastLetter}`;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

// function getString(str: string){
//     if(str){
//         return str.toUpperCase()
//     }
// }
