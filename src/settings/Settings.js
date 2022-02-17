
import './Settings.css';
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
    <div id="settings_header">
        <div className="row header">
        <p>Settings</p>
        </div>
    </div>
  );
}

const invalidLoginAlert = () => {
    alert("Current password is incorrect.");
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

const validateLogin = async (username, password) => {
  let hashValue = await getHash(username, password);

  let url = 'http://liquorish-server.azurewebsites.net/login/' + username + '/' + hashValue.toUpperCase();
  console.log(url);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false); // false for synchronous request
  xmlHttp.send(null);
  
  return xmlHttp.responseText;
}

const LoginFormUser = (props) => {
  let navigate = useNavigate();

  // added for Settings A3
  const [inputnewcityandstate, Setinputnewcityandstate] = React.useState("");
  const [inputcurrentpassword, Setinputcurrentpassword] = React.useState("");
  const [inputnewpassword, Setinputnewpassword] = React.useState("");
  const [inputconfirmnewpassword, Setinputconfirmnewpassword] = React.useState("");

  const usercitystate = React.useRef(null);
  const currentPasswordInput = React.useRef(null);
  const newPasswordInput = React.useRef(null);
  const confirmNewPasswordInput = React.useRef(null);

  const handleCityStateChange = () => {
    Setinputnewcityandstate(usercitystate.current.value)
  }

  const handleCurrentPasswordChange = () => {
    Setinputcurrentpassword(currentPasswordInput.current.value)
  }

  const handleNewPasswordChange = () => {
    Setinputnewpassword(newPasswordInput.current.value)
  }

  const handleConfirmNewPasswordChange = () => {
    Setinputconfirmnewpassword(confirmNewPasswordInput.current.value)
  }

  const completeLogin = async () => {
    // need to get client ID and pass it up to index
    navigate("home/user", { replace: true });
  }

  // validate the current password.
  const handleSignIn = async () => {
    const response = await validateLogin(username, inputcurrentpassword);
    response === "true" ? completeLogin() : invalidLoginAlert();
  }

  // add function to validate the user has entered the new password and confirm new password same
  // If same, reset the password, not same prompt user to enter the password again.

  
  return (
    <div>
        <div className="row desc">
           <div className="row">
            <p>BenderactCommandband</p>
           </div>
           <div className="row">
            <p>Birth Date: 1987-06-16</p>
           </div>
        </div>
        <div className="bodyContent">
           <div className="row">
              <p>City: Burlington, NC</p>
           </div>
            <div className="row">
                <form>
                    <input id="user_city_state" type="text" placeholder="(inputnewcityandstate)" ref={ usercitystate } onChange={ handleCityStateChange }/>
                    <button className="btnPrimary" onClick={ handleCityState }>Search</button>
                </form>
            </div>
            <div className="row">
            <p>Reset Password</p>
           </div>
            <div className="row">
                <input id="user_currentpassword" type="password" placeholder="(inputcurrentpassword)" ref={ currentPasswordInput } onChange={ handleCurrentPasswordChange }/>
            </div>
            <div className="row">
                <input id="user_newpassword" type="password" placeholder="(inputnewpassword)" ref={ newPasswordInput } onChange={ handleNewPasswordChange }/>
                <input id="user_confirmNewpassword" type="password" placeholder="(inputconfirmnewpassword)" ref={ confirmNewPasswordInput } onChange={ handleConfirmNewPasswordChange }/>
            </div>
        </div>
        <div className="row">
          <button className="btnPrimary" onClick={ handleReset }>Reset</button>
        </div>
        <div className="row">
            <button className="btnSecondary" onClick={ logoutUser }>Log Out</button>
        </div>
        <div className="row footer">
           <div className="row">
              <p>Saved Drinks</p>
           </div>
        </div>
    </div>
  );
}

// end of additions for Settings A3