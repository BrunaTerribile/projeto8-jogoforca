import React from 'react'
import palavras from './palavras'

function App() {

  const [key, setKey] = React.useState(false); //estado das teclas do alfabeto: on ou off
  const [word, setWord] = React.useState(""); //estado da palavra: vazia ou escolhida
  const [display, setDisplay] = React.useState([]); //estado da palavra que aparece para o usuário
  const [wordArr, setWordArr] = React.useState([]); // estado da palavra em forma de array - atualizado conforme as letras são inseridas
  const [forca, setForca] = React.useState('./img/forca0.png'); // estado da forca
  const [nErro, setNErro] = React.useState(1); // estado contagem de erros
  const [clickedL, setClickedL] = React.useState([]); //estado das letras clicadas
  const [shot, setShot] = React.useState(""); // estado do chute
  const [wordClass, setWordClass] = React.useState("word"); // estado do palavra revelada: vermelha ou verde

  return (
    <>
      <main>
        <img data-identifier="game-image" className="hangman" src={forca}></img>
        <div className="side">
          <div onClick={RandomWord}> <button data-identifier="choose-word" >Escolher Palavra</button> </div>
          <div data-identifier="word" className={wordClass}> {word} </div>
        </div>

      </main>

      <div className="bottomBar">
        <Keyboard></Keyboard>
        <div className="shot">
          <p>Já sei a palavra!</p>
          <input data-identifier="type-guess" value={shot} onChange={e => setShot(e.target.value)} ></input>
          <button data-identifier="guess-button" onClick={guess}>Chutar</button>
        </div>
      </div>
    </>
  )

  function Keyboard() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    return (
      <div className="keyboard">
        {alphabet.map((letter) => clickedL.includes(letter) ? (<div data-identifier="letter" className='letterOff' onClick={() => checkLetter(letter)} >{letter.toUpperCase()}</div>) :
          (<div data-identifier="letter" className={key ? 'letterOn' : 'letterOff'} onClick={() => checkLetter(letter)} >{letter.toUpperCase()}</div>))}
      </div>
    )
  }

  function RandomWord() {

    setForca('./img/forca0.png')
    setNErro(1)
    setWordClass("word")
    setClickedL([])

    const indexWord = Math.floor(Math.random() * palavras.length); //resultado aleatório
    const myWord = palavras[indexWord]; // armazena a palavra
    const splitWord = [...myWord]; //armazena a palavra em formato de array, cada letra um elemento

    let hiddenWord = splitWord.map((word) => "_") //substitui cada letra do array da palavra por um underline

    console.log(myWord) // banana
    console.log(splitWord); // {"b", "a", "n", "a", "n", "a"}
    console.log(hiddenWord) // {"_","_","_","_","_","_"}

    setWordArr(splitWord)
    setDisplay(hiddenWord)
    setWord(hiddenWord)
    setKey(true)
  }

  function checkLetter(letter) {

    let ltr = letter; //armazena a letra em outra variável
    let auxArr = display // armazena a palavra visivel em um array auxiliar

    clickedL.push(ltr) // acrescenta a letra clicada no array de letras clicadas
    setClickedL(clickedL)

    if (wordArr.includes(ltr)) {
      for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i] === ltr) {
          auxArr[i] = ltr //substitui as letras encontradas
        }
      }
    } else {
      return hang()
    }

    setWord(auxArr.join("")) // atualiza a palavra visivel para o usuário (retorna uma string)
    endGame()
  }

  function endGame() {
    console.log(word)
    if (!word.includes("_")) { //verifica se restam _ a completar
      setWordClass("word correct")
      setWord(wordArr.join(""))
      setKey(false)
    }
    if (nErro >= 6) { //verifica a quantidade de erros
      setWord(wordArr.join(""))
      setWordClass("word incorrect")
      setKey(false)
    }
  }

  function hang() {
    setNErro(nErro + 1); //incrementa a contagem de erro
    setForca(`./img/forca${nErro}.png`)
    return endGame()
  }

  function guess() {
    if (shot === wordArr.join("")) {
      setWord(wordArr.join(""))
      setWordClass("word correct")
      setKey(false)
    } else {
      setWord(wordArr.join(""))
      setWordClass("word incorrect")
      setKey(false)
    }
  }

}

export default App;
