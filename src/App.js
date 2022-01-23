//  This defines the app's logic.

import logo from './logo.svg';
import './App.css';

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

//  https://www.w3schools.com/react/react_components.asp
//
//  Function Component that Returns the page html to be displayed
//  (The css corresponding to this html is in
//  App.css)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img 
          src={ logo } 
          className="App-logo" 
          alt="logo" 
        />

        <p>
          Liquorish!
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         learn react
        </a>
      </header>
    </div>
  );
}

//  Eport the function to be called elsewhere
export default App;
