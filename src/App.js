import logo from './logo.svg';
import './App.css';
import {mapList} from './maps.js'
import { useState } from 'react';
import MapApp from './MapApp.js'

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
        <MapApp />
        {/* <button onClick={handleClick}>
          Next location
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
      </iframe> */}
      </header>
    </div>
  );
}