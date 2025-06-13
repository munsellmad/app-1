import logo from './logo.svg';
import './App.css';

function App() {
  function handleClick(){
    alert("Good Job!!");
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>Click Here!</button>
      </header>
    </div>
  );
}


export default App;
