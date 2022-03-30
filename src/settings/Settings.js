
import './Settings.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import HeaderV2 from '../headerv2/HeaderV2';
import SavedDrinks from '../SavedDrinks/SavedDrinks';
import { Button, Row, Stack, Col } from 'react-bootstrap';

//==============================================================================
//  Module - Settings
//==============================================================================

export default function Settings({ updateAuth }) {

  const navigate = useNavigate()

  const [user_data, setUserData] = React.useState({})
  const [is_loaded, setIsLoaded] = React.useState(false)

  /**
   * Gets the users data via API call. specifically, this checks to see if the 
   * client id is set in storage first. if it isn't then the promise is rejected,
   * and the user should be logged out, as client_id is only set on login.
   */
  const getUserData = () => {
    return new Promise(async (resolve, reject) => {

      const client_id = JSON.parse(sessionStorage.getItem('client_id'));

      if (client_id > 0) {
        const url = 'https://liquorish-server.azurewebsites.net/user/' + client_id;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        resolve(jsonResponse.value);
      } else {
        reject();
      }
    });
  };

  /**
   * useEffect runs the provided callback once on page load
   */
  useEffect(() => {
    getUserData().then((_user_data) => {

      // This function runs on 'resolve'

      setUserData(_user_data);
      setIsLoaded(true);
    }, () => {

      // This funciton runs on 'reject', removing user auth and redirecting them
      // to the login.

      sessionStorage.removeItem('is_auth');
      navigate("/", { replace: true });
    })
  }, []);

  return (
    <div className="root">
      <HeaderV2
        title={"Settings"}
        does_nav={true}
        nav_link={'/home/user'}
      />

      {is_loaded &&
        <Stack>
          <SettingsFormUser user={user_data} updateAuth={updateAuth} />

          <div id="saved-drinks-banner">
            SavedDrinks
          </div>

          <SavedDrinks client_id={user_data.id} dom_injecting_callback={() => { }} on_drink_click={() => { }} />
        </Stack>
      }
    </div>
  );
}

//==============================================================================
//  Module - SettingsFormUser
//==============================================================================

const SettingsFormUser = ({ user, updateAuth }) => {

  let navigate = useNavigate();

  const [inputnewcity, Setinputnewcity] = React.useState("");
  const [inputnewstate, Setinputnewstate] = React.useState("");
  const [inputcurrentpassword, Setinputcurrentpassword] = React.useState("");
  const [inputnewpassword, Setinputnewpassword] = React.useState("");
  const [inputconfirmnewpassword, Setinputconfirmnewpassword] = React.useState("");

  const usercity = React.useRef(null);
  const userstate = React.useRef(null);
  const currentPasswordInput = React.useRef(null);
  const newPasswordInput = React.useRef(null);
  const confirmNewPasswordInput = React.useRef(null);

  const handleCityChange = () => {
    Setinputnewcity(usercity.current.value)
  }

  const handleStateChange = () => {
    Setinputnewstate(userstate.current.value)
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

  function handleCityState() {
    const post_args = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        userId: user.id,
        city: inputnewcity,
        state: inputnewstate,
      })
    }

    console.log(inputnewcity)

    fetch("https://liquorish-server.azurewebsites.net/updateCityState", post_args).then((response) => {

      // This is just to make the page refresh
      Setinputnewcity(inputnewcity)

      console.log(response.json)
    });
  }

  function handleReset(props) {
    console.log('not implemented')
  }

  function logoutUser(props) {
    sessionStorage.clear()
    updateAuth('0').then(() => {
      navigate("/")
    })
  }

  return (
    <Stack id="settings-form-user">
      <Stack id="settings-header">
        <Row>
          <h1>{user.username}</h1>
        </Row>

        <Row>
          <div>DOB: {user.birth_date.substring(0, user.birth_date.indexOf('T'))}</div>
        </Row>

        <Row>
          <div>City/State: {user.address_city}, {user.address_state}</div>
        </Row>
      </Stack>

      <Stack id="city-state-form">
        <Row id="city-state-input">
          <Col className="g-1">
            <input id="user_city" type="text" placeholder="City" ref={usercity} onChange={handleCityChange} />
          </Col>
          <Col className="g-1">
            <input id="user_state" type="text" placeholder="State" ref={userstate} onChange={handleStateChange} />
          </Col>
        </Row>
        <Button className="btn-primary" onClick={handleCityState}>Update City/State</Button>
      </Stack>

      <Stack id="password-input-form">
        <input id="user_currentpassword" type="password" placeholder="Current Password" ref={currentPasswordInput} onChange={handleCurrentPasswordChange} />
        <input id="user_newpassword" type="password" placeholder="New Password" ref={newPasswordInput} onChange={handleNewPasswordChange} />
        <input id="user_confirmNewpassword" type="password" placeholder="Confirm New Password" ref={confirmNewPasswordInput} onChange={handleConfirmNewPasswordChange} />
      </Stack>

      <Stack>
        <Button className="btn-primary" id="reset-pass-btn" onClick={handleReset}>Reset Password</Button>
        <Button className="btn-secondary" onClick={logoutUser}>Log Out</Button>
      </Stack>
    </Stack>
  );
}

