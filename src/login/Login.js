
import './Login.css';
import React from 'react';
import logo from '../media/logo.svg';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Stack, Button, Alert, Image } from 'react-bootstrap';

//==============================================================================
//  Module - Login
//==============================================================================

/**
 * Main login module.
 * 
 * props:
 * 
 *    updateAuth - This is a callback that is provided by the index page. Use this
 *      callback to update the current authorization state for the user or bar.
 *      See index.js for more.
 */
export default function Login({ updateAuth }) {

  return (
    <div className="root" id="login-root">
      <Row className="g-0" id="login-contents">

        <LoginHeader />

        {/* Passing the callback property to the polyform */}
        <PolyForm updateAuth={updateAuth} />

      </Row>
    </div>
  );
}

//==============================================================================
//  Module - LoginHeader
//==============================================================================

/**
 * Static header for the login screen.
 */
function LoginHeader() {
  return (
    <Stack id="login-header">
      <Image id="login-logo" src={logo} width="200px" height="200px" alt="logo" />
      <div id="login-app-name">
        <p>LIQUORISH</p>
      </div>
    </Stack>
  );
}

//==============================================================================
//  Module - PolyForm
//==============================================================================

/**
 * Very poorly done 'enum' for js, but it works. It is at the global level
 * so that it can be called by other modules.
 */
const FormType = {
  User: Symbol("user"),
  Bar: Symbol("bar")
}

/**
 * This poly form displays one of two modules at any given time,
 * LoginFormUser, and LoginFormBar, depending on what form_type is set in the 
 * module's state.
 *
 * props:
 * 
 *    updateAuth - This is a callback that is provided by the index page. Use this
 *      callback to update the current authorization state for the user or bar.
 * 
 * states: 
 *    
 *    form_type - The type of form module display: Bar or User.
 */
function PolyForm({ updateAuth }) {

  const [form_type, setFormType] = React.useState(null);

  // If the form type is null, it is User by default.
  if (form_type == null) {
    setFormType(FormType.User);
  }

  // Return either model given the supplied type case.
  switch (form_type) {
    case FormType.User:
      return <LoginFormUser updateAuth={updateAuth} setFormTypeHanlder={setFormType} />
    case FormType.Bar:
      return <LoginFormBar updateAuth={updateAuth} setFormTypeHanlder={setFormType} />
  }
}

//==============================================================================
//  Module - LoginFormUser
//==============================================================================

function LoginFormUser({ updateAuth, setFormTypeHanlder }) {

  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  const usernameInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const handleUsernameChange = () => {
    setUsername(usernameInput.current.value)
  }

  const handlePasswordChange = () => {
    setPassword(passwordInput.current.value)
  }

  const handleSignIn = () => {
    validateUserLogin(username, password).then((_response) => {

      console.log("validating login...");

      /**
       * If the response status is not 0 'success' or the client id is negative,
       * then there was an error and the invalid login alert should be displayed.
       * 
       * It is technically possible that response.value COULD be null here, but that
       * would need to be fixed in the backend. We should expect that a response status
       * of 0 means that the value is non-null.
       */
      if (_response && (_response["client id"] < 0)) {
        invalidLoginAlert();
        return;
      }

      updateAuth('1').then(() => {
        console.log("setting client_id")
        sessionStorage.setItem('client_id', _response["client id"]);
        console.log("navigating to home/user")
        navigate("/home/user");
      });
    })
  }

  return (
    <Stack>
      <Row className="g-0">
        <p id="login-direction">Sign in to user</p>
      </Row>
      <Row className="g-0">
        <Stack id="login-input-stack">
          <input className="login-input" type="text" placeholder="Username" ref={usernameInput} onChange={handleUsernameChange} />
          <input className="login-input" type="password" placeholder="Password" ref={passwordInput} onChange={handlePasswordChange} />
        </Stack>
      </Row>
      <Row className="g-0">
        <Stack>
          <Button className="login-button" variant="primary" onClick={handleSignIn}>Sign In</Button>
          <Button className="login-button" variant="secondary" onClick={() => { createUserAlert(setShowAlert) }}>Sign Up</Button>
          <Button className="login-button" variant="secondary" onClick={() => { setFormTypeHanlder(FormType.Bar) }}>Sign in to bar</Button>
        </Stack>
      </Row >
      <div className="page_alert">
        <AlertDismissable state={showAlert} handler={setShowAlert} />
      </div>
    </Stack>
  );
}

//==============================================================================
//  Module - LoginFormBar
//==============================================================================

function LoginFormBar({ updateAuth, setFormTypeHanlder }) {

  const navigate = useNavigate();

  const [bar_username, setBarUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const barUsernameInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const handleBarUsernameChange = () => {
    setBarUsername(barUsernameInput.current.focus())
  }

  const handlePasswordChange = () => {
    setPassword(passwordInput.current.focus())
  }

  const handleCreateBar = () => {
    navigate("/CreateBar");
  }

  const handleSignIn = () => {
    validateBarLogin(bar_username, password).then((_response) => {

      console.log("validating login...");

      /**
       * If the response status is not 0 'success' or the client id is negative,
       * then there was an error and the invalid login alert should be displayed.
       * 
       * It is technically possible that response.value COULD be null here, but that
       * would need to be fixed in the backend. We should expect that a response status
       * of 0 means that the value is non-null.
       */
      if (_response && (_response["client id"] < 0)) {
        invalidLoginAlert();
        return;
      }

      updateAuth('2').then(() => {
        console.log("setting client_id")
        sessionStorage.setItem('client_id', _response["client id"]);
        console.log("navigating to home/bar")
        navigate("/home/bar");
      });
    })
  }

  return (
    <Stack>
      <Row className="g-0">
        <p id="login-direction">Sign in to Bar</p>
      </Row>
      <Row className="g-0">
        <Stack id="login-input-stack">
          <input className="login-input" type="text" placeholder="Username" ref={barUsernameInput} onChange={handleBarUsernameChange} />
          <input className="login-input" type="password" placeholder="Password" ref={passwordInput} onChange={handlePasswordChange} />
        </Stack>
      </Row>
      <Row className="g-0">
        <Stack>
          <Button className="login-button" variant="primary" onClick={handleSignIn}>Sign In</Button>
          <Button className="login-button" variant="secondary" onClick={handleCreateBar}>Register Bar</Button>
          <Button className="login-button" variant="secondary" onClick={() => { setFormTypeHanlder(FormType.User) }}>Sign in as user</Button>
        </Stack>
      </Row>
    </Stack>
  );
}

//==============================================================================
//  Module - AlertDismissable
//==============================================================================

function AlertDismissable({ state, handler }) {
  return (
    <Alert show={state} variant="primary" onClose={() => handler(false)} dismissible>
      <p>
        New users must sign up at a location providing Liquorish services.
      </p>
    </Alert>
  )
}

//==============================================================================
//  Functions
//==============================================================================

/**
 * Manipulates displaying the AlertDismissable module by setting the show_alert
 * state to true, causing the page to reload and be re-rendered as visible.
 * 
 * Alert is visible for 10 seconds.
 */
function createUserAlert(setShowAlert) {
  setShowAlert(true);
  setTimeout(() => {
    setShowAlert(false);
  }, 10000);
}

/**
 * Displays an alert to the screen.
 */
function invalidLoginAlert() {
  alert("Username or password is incorrect.");
}

/**
 * Makes an API call to the backend to login in the user
 */
function validateUserLogin(username, password) {
  const url = 'https://liquorish-server.azurewebsites.net/loginUser/' + username + '/' + password;
  return makeGetRequest(url)
}

/**
 * Makes an API call to the backend to login in the user
 */
function validateBarLogin(username, password) {
  const url = 'https://liquorish-server.azurewebsites.net/loginBar/' + username + '/' + password
  return makeGetRequest(url)
}

function makeGetRequest(url) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    resolve(jsonResponse.value)
  });
}




