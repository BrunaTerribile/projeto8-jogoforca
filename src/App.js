import React from 'react'
import palavras from './palavras'

function App() {
  
  const [key, setKey] = React.useState(false);
  const [word, setWord] = React.useState("");
  let wordArr = [];

  return (
    <>
      <main>
        <img className="hangman" src='./img/forca0.png'></img>
        <div className="side">
          <div onClick={RandomWord}> <button>Escolher Palavra</button> </div>
          <div className="word"> {word} </div>
        </div>

      </main>

      <div className="bottomBar">
        <Keyboard></Keyboard>

        <div className="shot">
          <p>Já sei a palavra!</p>
          <input></input>
          <button>Chutar</button>
        </div>
      </div>
    </>
  )


  function Keyboard() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    
    return (
      <div className="keyboard">
        {alphabet.map(letter => <div className={key ? 'letterOn' : 'letterOff'} >{letter.toUpperCase()}</div>)}
      </div>
    )
  }

  function RandomWord() {

    const indexWord = Math.floor(Math.random() * palavras.length); //resultado aleatório
    const myWord = palavras[indexWord]; // armazena a palavra
    wordArr = [...myWord]; //armazena a palavra em formato de array, cada letra um elemento

    let hiddenWord = wordArr.map((word) => "_") //substitui cada letra do array da palavra por um underline

    console.log(myWord) // banana
    console.log(wordArr); // {"b", "a", "n", "a", "n", "a"}
    console.log(hiddenWord) // {"_","_","_","_","_","_"}

    setWord(hiddenWord);
    setKey(true);

  }

}





export default App;
