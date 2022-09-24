import './palavras'



function App() {
  return (
    <>
      <main>
        <img className="hangman" src='./img/forca0.png'></img>
        <div className="side">
          <div> <button>Escolher Palavra</button> </div>
          <div className="word"> b_t_t_ </div>
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
}

function Keyboard() {

  const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  return (
    <div className="keyboard">
      {alfabeto.map(letra => <div className='letter'>{letra.toUpperCase()}</div>)}
    </div>

  )


}





export default App;
