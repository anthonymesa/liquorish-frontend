
import './Login.css';
import React from 'react';
import logo from '../media/logo.svg';
import { useNavigate } from "react-router-dom";
import { history } from 'react-router';
import ValidateAuth from '../Auth';

//  Closest I can get to a javascript enum
const FormType = {
  User: Symbol("user"),
  Bar: Symbol("bar")
}

const LoginHeader = () => {
  return (
    <div id="login_header">
        <div className="row header">
            <img src={ logo } width="200px" height="200px" alt="logo" />
        </div>
        <div className="row logoName">
            <p>LIQUORISH</p>
        </div>
    </div>
  );
}

const createUserAlert = () => {
  alert("Go to your local bar to sign up!");
}

const invalidLoginAlert = () => {
  alert("Username or password is incorrect.");
}

const validateLogin = async (username, password, cb) => {

  const url = 'http://liquorish-server.azurewebsites.net/login/' + username + '/' + password;

  fetch(url).then(response => {
    if(response.ok) {
      return response.json();
    }
  }).then(data => {
    console.log(data);
    cb(data);
  });
}

const LoginFormUser = (props) => {
  let navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const usernameInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const { setAuth, is_auth } = ValidateAuth()

  const handleUsernameChange = () => {
    setUsername(usernameInput.current.value)
  }

  const handlePasswordChange = () => {
    setPassword(passwordInput.current.value)
  }

  const completeLogin = async () => {
    setAuth(true, () => {
      navigate("home/user");
    });
  }

  const handleSignIn = async () => {
    await validateLogin(username, password, (response) => {
      response === true ? completeLogin() : invalidLoginAlert();
    });
  }

  return (
    <div>
        <div className="row desc">
            <p>Sign in to user</p>
        </div>
        <div className="bodyContent">
            <div className="row">
                <form>
                    <input id="user_username" type="text" placeholder="Username" ref={ usernameInput } onChange={ handleUsernameChange }/>
                </form>
            </div>
            <div className="row">
                <input id="user_password" type="password" placeholder="Password" ref={ passwordInput } onChange={ handlePasswordChange }/>
            </div>
        </div>
        <div className="row">
          <button className="btnPrimary" onClick={ handleSignIn }>Sign In</button>
        </div>
        <div className="row">
            <button className="btnSecondary" onClick={ createUserAlert }>Sign Up</button>
        </div>
        <div className="row footer">
          <button className="btnSecondary" onClick={ () => { props.setFormTypeHanlder(FormType.Bar) } }>Sign in as bar</button>
        </div>
    </div>
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
    <div>
        <div className="row desc">
            <p>Sign in to Bar</p>
        </div>
        <div className="bodyContent">
            <div className="row">
                <form>
                    <input id="user_username" type="text" placeholder="Username" ref={ barUsernameInput } onChange={ handleBarUsernameChange }/>
                </form>
            </div>
            <div className="row">
                <input id="user_password" type="password" placeholder="Password" ref={ passwordInput } onChange={ handlePasswordChange }/>
            </div>
        </div>
        <div className="row">
          <button className="btnPrimary" onClick={ handleSignIn }>Sign In</button>
        </div>
        <div className="row">
            <button className="btnSecondary" onClick={ handleCreateBar }>Register Bar</button>
        </div>
        <div className="row footer">
          <button className="btnSecondary" onClick={ () => { props.setFormTypeHanlder(FormType.User) } }>Sign in as user</button>
        </div>
    </div>
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
    <div>
      <div id="login_page">
        <div className="wrapper column">
          <LoginHeader />
          <PolyForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
