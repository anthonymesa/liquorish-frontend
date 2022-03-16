import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Connect CSS stylesheet.
import './App.css';

// Import our main page modules.
import Login from './login/Login';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard'
import ValidateAuth from './Auth';
import OrderView from './order_view/OrderView';

const App = (props) => {
  const { is_auth, setAuth } = ValidateAuth()

  if(!is_auth){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/user" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/orderview" element={<OrderView />} />
        <Route path="*" element={<Navigate to="/home/user"/>} />
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
