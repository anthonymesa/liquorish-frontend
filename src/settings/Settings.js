
import './Settings.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const FormType = {
  User: Symbol("user"),
  Drinks: Symbol("drinks")
}

const SettingsHeader = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    sessionStorage.removeItem('bar')
    navigate("/home/user", { replace: true });
  }

  return (
    <div className="header">
      <div id="settings_nav" onClick={() => { handleHome() }}>
        <FiChevronLeft /> Home
      </div>
    </div>
  );
}

const invalidLoginAlert = () => {
  alert("Current password is incorrect.");
}

const SettingsFormUser = (props) => {
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

  function handleCityState(props) {
    const element = (
      <div>
        <h1>handleCityState - Not implemented yet!</h1>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }

  function handleReset(props) {
    const element = (
      <div>
        <h1>handleReset - Not implemented yet!</h1>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
  }

  function logoutUser(props) {
    const element = (
      <div>
        <h1>logoutUser - Not implemented yet!</h1>
      </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
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
            <input id="user_city_state" type="text" placeholder="(inputnewcityandstate)" ref={usercitystate} onChange={handleCityStateChange} />
            <button className="btnPrimary" onClick={handleCityState}>Search</button>
          </form>
        </div>
        <div className="row">
          <p>Reset Password</p>
        </div>
        <div className="row">
          <input id="user_currentpassword" type="password" placeholder="(inputcurrentpassword)" ref={currentPasswordInput} onChange={handleCurrentPasswordChange} />
        </div>
        <div className="row">
          <input id="user_newpassword" type="password" placeholder="(inputnewpassword)" ref={newPasswordInput} onChange={handleNewPasswordChange} />
          <input id="user_confirmNewpassword" type="password" placeholder="(inputconfirmnewpassword)" ref={confirmNewPasswordInput} onChange={handleConfirmNewPasswordChange} />
        </div>
      </div>
      <div className="row">
        <button className="btnPrimary" onClick={handleReset}>Reset</button>
      </div>
      <div className="row">
        <button className="btnSecondary" onClick={logoutUser}>Log Out</button>
      </div>
    </div>
  );
}

const DrinksFormUser = (props) => {

  const listDrinks = () => {
    return [
      {
        name: "Glenfiddich Whiskey",
      },
      {
        name: "Captain Morgan Spiced Rum",
      },
      {
        name: "Flying Horse Beer",
      }
    ]
  }

  const barListItems = listDrinks.map((data) =>
    <div>
      <h1>{data.name}</h1>
    </div>
  );

  const Header = () => {
    return (
      <div>
        <div>Saved Drinks</div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      {barListItems}
    </div>
  )
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

const Drinks = (props) => {
  return (
    <div>
      <div id="drinks_page">
        <div className="wrapper column">
          <DrinksFormUser applicationState={props.applicationState} />
        </div>
      </div>
    </div>
  );
}


export default Settings;
export { Drinks };

// end of additions for Settings A3