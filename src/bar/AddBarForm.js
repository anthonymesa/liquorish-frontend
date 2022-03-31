
import './AddBar.css';
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
export default function AddBarForm({ updateAuth }) {
console.log("AddBarForm")
  return (
    <div className="root" id="login-root">
      <p>AddBarForm</p>
      <Row className="g-0" id="login-contents">

        <BarHeader />

        {/* Passing the callback property to the polyform */}
        <PolyForm />

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
function BarHeader() {
  return (
    <Stack id="login-header">
      <Image id="login-logo" src={logo} width="200px" height="200px" alt="logo" />
      <div id="login-app-name">
        <p>Add Bar</p>
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
function PolyForm() {

 // const [form_type, setFormType] = React.useState(null);
return (
  // If the form type is null, it is User by default.
 <AddBarFormInput/>);
}

//==============================================================================
//  Module - LoginFormUser
//==============================================================================

function AddBarFormInput({ updateAuth, setFormTypeHanlder }) {

  const navigate = useNavigate();

  const [barName, setBarname] = React.useState("");
  const [addressStreet, setAddressStreet] = React.useState("");
  const [addressCity, setAddressCity] = React.useState("");
  const [addressState, setAddressState] = React.useState("");
  const [addressZip, setAddressZip] = React.useState("");
  const [gpsLat, setGpsLat] = React.useState("");
  const [gpsLon, setGpsLon] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [password, setPassword] = React.useState("");

  const barnameInput = React.useRef(null);
  const addressStreetInput = React.useRef(null);
  const addressCityInput = React.useRef(null);
  const addressStateInput = React.useRef(null);
  const addressZipInput = React.useRef(null);

  const gpsLatInput = React.useRef(null);
  const gpsLonInput = React.useRef(null);
  const descriptionInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  const handleBarnameChange = () => {
    setBarname(barnameInput.current.value)
  }
  const handleAddressStreetChange = () => {
    setAddressStreet(addressStreetInput.current.value)
  }
  const handleAddressCityChange = () => {
    setAddressCity(addressCityInput.current.value)
  }
  const handleAddressStateChange = () => {
    setAddressState(addressStateInput.current.value)
  }
  const handleAddressZipChange = () => {
    setAddressZip(addressZipInput.current.value)
  }
  const handleGPSLatChange = () => {
    setGpsLat(gpsLatInput.current.value)
  }
  const handleGPSLonChange = () => {
    setGpsLon(gpsLonInput.current.value)
  }
  const handlePasswordChange = () => {
    setPassword(passwordInput.current.value)
  }
  const handleDescriptionChange = () => {
    setPassword(passwordInput.current.value)
  }

/*
const bar_name= request.payload.bar_name;
  const address_street= request.payload.address_street;
  const address_city= request.payload.address_city;
  const address_state= request.payload.address_state;
  const address_zip= request.payload.address_zip;
  const gps_lat= request.payload.gps_lat;
  const gps_lon= request.payload.gps_lon;
  const description= request.payload.description;
  const password = request.payload.password;
*/
  const handleRegister = () => {
      const data = {
        barName:barName,
        addressStreet:addressStreet,
        addressCity:addressCity,
        addressState:addressState,
        addressZip:addressZip,
        gpsLat: gpsLat,
        gpsLon: gpsLon,
        description:description
      };
      fetch('http://localhost:8080/addBar', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      console.log ("DATA: ", data);
  }

  return (
    <div>
      <Row className="g-0">
        <p id="login-direction">Sign in to user</p>
      </Row>
      <Row className="g-0">
        <Stack id="login-input-stack">
          <input className="login-input" type="text" placeholder="Bar Name" 
          ref={barnameInput} onChange={handleBarnameChange} />
            
          <input className="login-input" type="text" placeholder="Street" 
          ref={addressStreetInput} onChange={handleAddressStreetChange} />    

          <input className="login-input" type="text" placeholder="City" 
          ref={addressCityInput} onChange={handleAddressCityChange} />  

          <input className="login-input" type="text" placeholder="State" 
          ref={addressStateInput} onChange={handleAddressStateChange} /> 

          <input className="login-input" type="text" placeholder="Zip Code" 
          ref={addressZipInput} onChange={handleAddressZipChange} /> 

          <input className="login-input" type="text" placeholder="GPS Latitude" 
          ref={gpsLatInput} onChange={handleGPSLatChange} /> 
                    
          <input className="login-input" type="text" placeholder="GPS Latitude" 
          ref={gpsLonInput} onChange={handleGPSLonChange} /> 

      <input className="login-input" type="text" placeholder="Description" 
          ref={descriptionInput} onChange={handleDescriptionChange} />  
          <input className="login-input" type="password" placeholder="Password"
           ref={passwordInput} onChange={handlePasswordChange} />
        </Stack>
      </Row>
      <Row className="g-0">
        <Stack>
          <Button className="login-button" variant="primary" onClick={handleRegister}>Sign In</Button>

        </Stack>
      </Row >
     
    </div>
  );
}

//==============================================================================
//  Module - LoginFormBar
//==============================================================================




  
function makeGetRequest(url) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    resolve(jsonResponse.value)
  });
}




