import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Connect CSS stylesheet.
import './App.css';

// Import our main page modules.
import Login from './login/Login';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard'
import OrderView from './order_view/OrderView';
import NewOrder from './new_order/NewOrder';
import AddRto from './add_rto/AddRto';

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
       * This value, if in the storage should be 0-3, but it is possible that it
       * is null.
       */
      const volatile_auth_value = sessionStorage.getItem('is_auth')

      /**
       * This ensures that if the value is null or outside the 0-3 range, it
       * is converted to 0.
       */
      const auth_value = ((volatile_auth_value >= 0) && (volatile_auth_value <= 3)) ? volatile_auth_value : 0

      sessionStorage.setItem('is_auth', auth_value);

      resolve(auth_value);

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
      sessionStorage.setItem('is_auth', _auth_value);
      setIsAuth(_auth_value);
      resolve();
    });
  }

  const [is_auth, setIsAuth] = React.useState(0);
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

  if (is_auth == '1'){
    return (page_ready &&
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home/user" />} />
          <Route path="/home/user" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orderview" element={<OrderView />} />
          <Route path="/dashboard/neworder" element={<NewOrder />} />
          <Route path="/dashboard/neworder/addrto" element={<AddRto />} />
          <Route path="*" element={<Navigate to="/home/user" />} />
        </Routes>
      </BrowserRouter>
    )
  } else if (is_auth == '2'){
    return (page_ready &&
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home/user" />} />
          <Route path="/home/bar" element={<BarHome />} />
          <Route path="*" element={<Navigate to="/home/user" />} /> */}
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (page_ready &&
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login updateAuth={updateAuth} />} />
          <Route path="*" element={<Navigate to="/" />} />
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
