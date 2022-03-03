import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Connect CSS stylesheet.
import './App.css';

// Import our main page modules.
import Login from './login/Login';
import Home from './home/Home';
import ValidateAuth from './Auth';

const App = (props) => {
  const { is_auth, setAuth } = ValidateAuth()

  if(!is_auth){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home/user" element={<Home />} />
        <Route path="*" element={         
          <main>
            <img src='https://i.ytimg.com/vi/KEkrWRHCDQU/maxresdefault.jpg' />
          </main> 
        } />
      </Routes>
    </BrowserRouter>
  )
}

//  This renders the code generated in the React.StrictMode 
//  section to the 'root' element of index.html listed in
//  the public directory, before it is built to the final
//  file in the build directory.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
