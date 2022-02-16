
import './Login.css';
import React from 'react';
import logo from '../media/logo.svg';
import { useNavigate } from "react-router-dom";

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

const getHash = async (username, password) => {
    const utf8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
}

const validateLogin = async (username, password, cb) => {
  let hashValue = await getHash(username, password);

  const url = 'http://liquorish-server.azurewebsites.net/login/' + username + '/' + hashValue.toUpperCase();

  fetch(url)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
    })
    .then(data => {
      console.log(data);
      cb(data);
    })
  }

const LoginFormUser = (props) => {
  let navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const usernameInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const handleUsernameChange = () => {
    setUsername(usernameInput.current.value)
  }

  const handlePasswordChange = () => {
    setPassword(passwordInput.current.value)
  }

  const addDataIntoCache = (cacheName, url, response) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));
  
    console.log(data);

    if ('caches' in window) {
      // Opening given cache and putting our data into it
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });
    }
  };

  const completeLogin = async () => {
    // need to get client ID and pass it up to index
    addDataIntoCache('Liquorish', 'http://localhost:3000', 'some_value');
    localStorage.setItem('test', JSON.stringify("a pimp named slickback"));
    navigate("home/user", { replace: true, state: { author_name: "john_doe"} });
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
        applicationState={ props.applicationState } 
        setFormTypeHanlder={ setFormType }
      />
    case FormType.Bar:
      return <LoginFormBar 
        applicationState={ props.applicationState } 
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
          <PolyForm applicationState={ props.applicationState }/>
        </div>
      </div>
    </div>
  );
}

export default Login;
