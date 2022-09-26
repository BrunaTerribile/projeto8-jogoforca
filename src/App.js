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
  const [wordClass, setWordClass] = React.useState("word"); // estado do chute

  return (
    <>
      <main>
        <img className="hangman" src={forca}></img>
        <div className="side">
          <div onClick={RandomWord}> <button>Escolher Palavra</button> </div>
          <div className={wordClass}> {word} </div>
        </div>

      </main>

      <div className="bottomBar">
        <Keyboard></Keyboard>

        <div className="shot">
          <p>Já sei a palavra!</p>
          <input value={shot} onChange={e => setShot(e.target.value)} ></input>
          <button onClick={guess}>Chutar</button>
        </div>
      </div>
    </>
  )


  function Keyboard() {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    return (
      <div className="keyboard">
        {alphabet.map(letter => <div className={key ? 'letterOn' : 'letterOff'} onClick={() => checkLetter(letter)} >{letter.toUpperCase()}</div>)}
      </div>
    )
  }

  function RandomWord() {

    setForca('./img/forca0.png')
    setNErro(1)
    setWordClass("word")

    const indexWord = Math.floor(Math.random() * palavras.length); //resultado aleatório
    const myWord = palavras[indexWord]; // armazena a palavra
    const splitWord = [...myWord]; //armazena a palavra em formato de array, cada letra um elemento

    let hiddenWord = splitWord.map((word) => "_") //substitui cada letra do array da palavra por um underline

    console.log(myWord) // banana
    console.log(splitWord); // {"b", "a", "n", "a", "n", "a"}
    console.log(hiddenWord) // {"_","_","_","_","_","_"}

    setWordArr(splitWord);
    setDisplay(hiddenWord)
    setWord(hiddenWord);
    setKey(true);
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

    console.log(clickedL)

    setWord(auxArr.join("")) // atualiza a palavra visivel para o usuário (retorna uma string)
    return endGame()
  }

  function endGame() {
    if (!word.includes("_")) { //verifica se restam _ a completar ///não tá entrando aqui
      setWord(wordArr.join(""))
      setWordClass("word correct")
    }
    if (nErro >= 6) { //verifica a quantidade de erros
      setWord(wordArr.join(""))
      setWordClass("word incorrect")
    }
  }

  function hang() {
    setNErro(nErro + 1); //incrementa a contagem de erro
    console.log(nErro)
    setForca(`./img/forca${nErro}.png`)
    return endGame()
  }

  function guess() {
    if (shot === wordArr.join("")) {
      setWord(wordArr.join(""))
      setWordClass("word correct")
    } else {
      setWord(wordArr.join(""))
      setWordClass("word incorrect")
    }
  }

}

export default App;
