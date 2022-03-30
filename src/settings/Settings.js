import './Settings.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ValidateAuth from '../Auth';
import { useNavigate } from "react-router-dom";
//import {  Row, Stack, Button, Alert, Image  } from 'react-bootstrap';
import { Row, Stack } from 'react-bootstrap';
//import '../../../liquorish-backend/routes/get/getSavedDrinks';
//import '../../../liquorish-backend/routes/get/updateUserCityState';
//import '../../../liquorish-backend/routes/get/updateUserPassword';

const SettingsHeader = () => {
    return (
      <Stack id="settings_header">
        <Row id="row-header">
          <p><a href="/">back</a></p>
          <p>Settings</p>
        </Row>
      </Stack>
    );
}

const SettingsFormUser = (props) => {
    let navigate = useNavigate();

    // added for Settings A3
    const [inputnewcityandstate, Setinputnewcityandstate] = React.useState("");
    const [inputcurrentpassword, Setinputcurrentpassword] = React.useState("");
    const [inputnewpassword, Setinputnewpassword] = React.useState("");
    const [inputconfirmnewpassword, Setinputconfirmnewpassword] = React.useState("");
    const [showAlert, setShowAlert] = React.useState("");

    const usercitystate = React.useRef(null);
    const currentPasswordInput = React.useRef(null);
    const newPasswordInput = React.useRef(null);
    const confirmNewPasswordInput = React.useRef(null);

    sessionStorage.setItem("client_id", "JoJo");
    sessionStorage.setItem("password", "kasula");
  
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

  const handleCityState = () => {
      console.log("New City/State: ", inputnewcityandstate);
    }

    const handleReset = () => {
      if (sessionStorage.getItem("password") != inputcurrentpassword) {
        setShowAlert(true);
        alert("Current password not correct", showAlert);
        currentPasswordInput.current.focus();
      }
      if (inputnewpassword != inputconfirmnewpassword) {
        setShowAlert(true);
        alert("New Password doesn't match", showAlert);
        newPasswordInput.current.focus();
      }
      alert("Password need to be reset to newpassword....");
    }
  
  function logoutUser(props) {
      sessionStorage.setItem("client_id", "");
      sessionStorage.setItem("password", "");
      //console.log("Client Id", sessionStorage.getItem("client_id"));
      //console.log("Password", sessionStorage.getItem("password"));
      navigate("/", { replace: true });
    }

    const savedDrinks = ["GlenLevit Whisky", "Captain Morgan Rum", "Greygoose Vodka"];

    const listItems = savedDrinks.map((drink) =>
      <li key={drink}>{drink}</li>
    );

    const ItemsHeader = () => {
      return (
        <div>
          <span className="badge m-2 bg-primary">Saved Drinks</span>
        </div>
      )
    }

    // add function to validate the user has entered the new password and confirm new password same
    // If same, reset the password, not same prompt user to enter the password again.

    return (
      <Stack>
        <div className="row desc">
          <div className="row">
            <p>BenderactCommandband</p>
          </div>
          <div className="row">
            <p>Birth Date: 1987-06-16</p>
          </div>
        </div>
        <div className="bodyContent">
          <div class="form-group">
            <p>City: Burlington, NC</p>
          </div>
          <div className="form-group">
            <form>
              <input id="user_city_state" type="text" placeholder="(inputnewcityandstate)" ref={usercitystate} onChange={handleCityStateChange} />
              <button className="btnPrimary" onClick={handleCityState}>Search</button>
            </form>
          </div>
          <div >
            <span className="badge m-2 bg-primary">Reset Password</span>
          </div>
          <div className="form-group">
            <input id="user_currentpassword" type="password" placeholder="(inputcurrentpassword)" ref={currentPasswordInput} onChange={handleCurrentPasswordChange} />
          </div>
          <div className="form-group">
            <input id="user_newpassword" type="password" placeholder="(inputnewpassword)" ref={newPasswordInput} onChange={handleNewPasswordChange} />
            <input id="user_confirmNewpassword" type="password" placeholder="(inputconfirmnewpassword)" ref={confirmNewPasswordInput} onChange={handleConfirmNewPasswordChange} />
          </div>
        </div>
        <div className="bodyContent">
          <div>
            <button
              onClick={handleReset}
              variant="primary">
              Reset
            </button>
          </div>
          <div></div>
          <div>
            <button onClick={logoutUser} variant="info">Log Out</button>
          </div>
        </div>
        <div>
          <ItemsHeader />
          <ul>{listItems}</ul>
        </div>
      </Stack>
    );
  }
  const Settings = (props) => {
    return (
      <div>
        <div id="settings_page">
          <div className="wrapper column">
            <SettingsHeader />
            <SettingsFormUser applicationState={props.applicationState} />
          </div>
        </div>
      </div>
    );
  }
  
export default Settings;

// end of additions for Settings A3