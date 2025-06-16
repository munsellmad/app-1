import logo from './logo.svg';
import './App.css';
import {mapList} from './maps.js'
import { useState } from 'react';
import MapComponent from './MapComponent.js'

export default function App() {

const [index, setIndex] = useState(0);

  const [isActive, setIsActive] = useState(false);

  function handleClick(){
    setIndex((index + 1) % mapList.length);
    }
  

  let location = mapList[index];
  return (
    <div className="App">
      <header className="App-header">

        {/* <MapComponent /> */}
               {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        */}
        <button onClick={handleClick}>
          Next
          </button> 
          <h1>
            <i>{location.name}</i>
          </h1>
          <h3>  
        ({index + 1} of {mapList.length})
      </h3>
      <iframe src={location.url}
        width="800" 
        height="650" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
      </header>
    </div>
  );
}



// function MapComponent() {
//   function handleClick(){
//     alert("Good Job!!");
//   }
//   return (
//     <div className="MapComponent">
//       <header className="MapComponent-header">
//         <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4485751.709027774!2d-157.505!3d20.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7bffdb064f79e005%3A0x4b7782d274cc8628!2sHawaii!5e1!3m2!1sen!2sus!4v1749844644497!5m2!1sen!2sus" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> 
//       </header>
//     </div>
//   );
// }
//export default App;
//style="border:0;" 