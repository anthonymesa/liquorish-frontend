
import './Login.css';
import React from 'react';
import logo from '../media/logo.svg';
import { useNavigate } from "react-router-dom";
import ValidateAuth from '../Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Stack, Button, Alert, Image } from 'react-bootstrap';

//  Closest I can get to a javascript enum
const FormType = {
  User: Symbol("user"),
  Bar: Symbol("bar")
}

const LoginHeader = () => {
  return (
    <Stack id="login-header">
      <Image id="login-logo" src={ logo }  width="200px" height="200px" alt="logo"/>
      <div id="login-app-name">
        <p>LIQUORISH</p>
      </div>
    </Stack>
  );
}

const createUserAlert = (setShowAlert) => {
  setShowAlert(true);
  setTimeout(() => {
    setShowAlert(false);
  }, 10000);
}

const invalidLoginAlert = () => {
  alert("Username or password is incorrect.");
}

const validateLogin = async (username, password, cb) => {

  const url = 'http://liquorish-server.azurewebsites.net/login/' + username + '/' + password;

  console.log(url)

  fetch(url).then(response => {
    if(response.ok) {
      return response.json();
    }
  }).then(data => {
    cb(data); //!! EXPECTING { 'status': 0 } or similar
  });
}

const AlertDismissable = (props) => {
  return (
    <Alert show={props.state} variant="primary" onClose={() => props.handler(false)} dismissible>
      <p>
        New users must sign up at a location providing Liquorish services.
      </p>
    </Alert>
  )
}

const LoginFormUser = (props) => {
  let navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  console.log(showAlert);

  const usernameInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const { setAuth, is_auth } = ValidateAuth()

  const handleUsernameChange = () => {
    setUsername(usernameInput.current.value)
  }

  const handlePasswordChange = () => {
    setPassword(passwordInput.current.value)
  }

  const completeLogin = async (client_id) => {

    sessionStorage.setItem('client_id', client_id);

    setAuth(true, () => {
      navigate("home/user");
    });
  }

  const handleSignIn = async () => {
    
    /**
     * Call validateLogin with the password and username, and then pass it an anonymous
     * function to be used as a callback so that we can define custom actions to take
     * when validation is successful.
     * 
     * The anonymous function should provide a response object that contains two 
     * values, an integer designating the success status of the db call and the value object
     * containing the data returned from the call, which in this case should be a single 
     * object attribute "client id", an integer representation of the user_id
     * that is successfully signed in.
     */
    await validateLogin(username, password, (response) => {
      if(response.status == 0){
        response.value["client id"] > -1 ? completeLogin(response.value["client id"]) : invalidLoginAlert();
      } else {
        invalidLoginAlert();
      }
    });
  }

  return (
    <Stack>
        <Row>
            <p id="login-direction">Sign in to user</p>
        </Row>
        <Row>
          <Stack id="login-input-stack">
            <input className="login-input" type="text" placeholder="Username" ref={ usernameInput } onChange={ handleUsernameChange }/>
            <input className="login-input" type="password" placeholder="Password" ref={ passwordInput } onChange={ handlePasswordChange }/>
          </Stack>
        </Row>
        <Row>
          <Stack>
            <Button className="login-button" variant="primary" onClick={ handleSignIn }>Sign In</Button>
            <Button className="login-button" variant="secondary" onClick={ () => { createUserAlert(setShowAlert) }}>Sign Up</Button>
            <Button className="login-button" variant="secondary" onClick={ () => { props.setFormTypeHanlder(FormType.Bar) } }>Sign in to bar</Button>
          </Stack>
        </Row>
        <div className="page_alert">
          <AlertDismissable state={showAlert} handler={setShowAlert}/>
        </div>
    </Stack>
  );
}

const LoginFormBar = (props) => {

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
    // navigate to seperate page
  }

  const handleSignIn = () => {
    const response = validateLogin(bar_username, password);
    response === "true" ? console.log("logged in successfully") : invalidLoginAlert();
  }

  return (
    <Stack>
      <Row>
        <p id="login-direction">Sign in to Bar</p>
      </Row>
      <Row>
        <Stack id="login-input-stack">
          <input className="login-input" type="text" placeholder="Username" ref={ barUsernameInput } onChange={ handleBarUsernameChange }/>
          <input className="login-input" type="password" placeholder="Password" ref={ passwordInput } onChange={ handlePasswordChange }/>
        </Stack>
      </Row>
      <Row>
        <Stack>
          <Button className="login-button" variant="primary" onClick={ handleSignIn }>Sign In</Button>
          <Button className="login-button" variant="secondary" onClick={ handleCreateBar }>Register Bar</Button>
          <Button className="login-button" variant="secondary" onClick={ () => { props.setFormTypeHanlder(FormType.User) } }>Sign in as user</Button>
        </Stack>
      </Row>
    </Stack>
  );
}

const PolyForm = (props) => {
  const [form_type, setFormType] = React.useState(null);

  if(form_type == null){
    setFormType(FormType.User);
  }

  switch(form_type)
  {
    case FormType.User:
      return <LoginFormUser 
        setFormTypeHanlder={ setFormType }
      />
    case FormType.Bar:
      return <LoginFormBar 
        setFormTypeHanlder={ setFormType }
      />
  }
}

const Login = (props) => {

  return (
    <div className="root" id="login-root">
      <Row id="login-contents">
        <LoginHeader />
        <PolyForm />
      </Row>
    </div>
  );
}

export default Login;
