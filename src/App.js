//  This defines the app's logic.

import logo from './logo.svg';
import './App.css';

function get_a_number()
{
  return 10;
}

//  Returns the page html to be displayed
//  (The css corresponding to this html is in
//  App.css)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Liquorish!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          { get_a_number() } learn react
        </a>
      </header>
    </div>
  );
}

//  Eport the function to be called elsewhere
export default App;
