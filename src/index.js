import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Connect CSS stylesheet.
import './App.css';

// Import our main page modules.
import Login from './login/Login';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard'
import { setAuth, getAuth } from './Auth';
import OrderView from './order_view/OrderView';
import NewOrder from './new_order/NewOrder';

const App = (props) => {

  /**
   * Gets the authorization indicator from the session storage. If it hasnt been
   * set yet, then false is returned.
   * 
   * @returns 
   */
  const getLocalAuth = () => {
    return new Promise((resolve, reject) => {

      /**
       * The value saved in storage is a string. Convert to a boolean by checking
       * if the string equals true. false for all else (including null, etc.)
       */
      const auth_value = (sessionStorage.getItem('is_auth') == 'true');

      /**
       * Set the value right after casting the result of reading. This makes it so
       * that if is_auth was null or undefined, it is now set as false.
       */
      setLocalAuth(auth_value).then(() => {
        resolve(auth_value);
      });
    });
  }

  /**
   * If there was an issue setting the value, then this call is rejected.
   * 
   * @param {boolean} value The boolean value indicating authorization status
   * @returns Nothing
   */
  const setLocalAuth = (value) => {
    return new Promise((resolve, reject) => {

      const cast_value = (value == 'true') || (value == true);

      /** 
       * Set the is_auth value in session storage.
       */
      sessionStorage.setItem('is_auth', cast_value);

      resolve();
    });
  }

    /**
   * This handle will be passed to pages that need to be able to update the auth
   * state in this main application module which is mounting the other modules.
   * 
   * This function then sets both the local auth value in session storage, and then
   * the state of the main application, which will cause the main app to reload.
   * 
   * This reloading of state is important so that once the caller has reached the
   * .then() of the promise, the is_auth state will have been updated and navigate()
   * will be able to go to the proper page.
   * 
   * @param {*} auth_value 
   * @returns 
   */
  const updateAuth = (_auth_value) => {
    return new Promise((resolve, reject) => {
      setLocalAuth(_auth_value).then(() => {
        setIsAuth(_auth_value);
        resolve();
      });
    });
  }

  const [is_auth, setIsAuth] = React.useState(false);
  const [page_ready, setPageReady] = React.useState(false);

  /**
   * On initial mounting of the app, get the local auth (most likely false given
   * it shouldnt have been set yet), and then update the state with that value. This
   * causes a page refresh.
   */
  useEffect(() => {
    getLocalAuth().then(session_auth_value => {
      setIsAuth(session_auth_value);
      setPageReady(true);
    });
  }, []);

  if (!is_auth) {
    return (page_ready &&
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login updateAuth={updateAuth} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (page_ready &&
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home/user" />} />
          <Route path="/home/user" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orderview" element={<OrderView />} />
          <Route path="/dashboard/neworder" element={<NewOrder />} />
          <Route path="*" element={<Navigate to="/home/user"/>} />
        </Routes>
      </BrowserRouter>
    )
  }
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
