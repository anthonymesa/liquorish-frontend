//import './Settings.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import ValidateAuth from "../Auth";
import { useNavigate } from "react-router-dom";
//import {  Row, Stack, Button, Alert, Image  } from 'react-bootstrap';
import { Row, Stack } from "react-bootstrap";
//import '../../../liquorish-backend/routes/get/getSavedDrinks';
//import '../../../liquorish-backend/routes/get/updateUserCityState';
//import '../../../liquorish-backend/routes/get/updateUserPassword';

const BarSettingsHeader = () => {
  return (
    <Stack id="barsettings_header">
      <Row id="row-header">
        <p>
          <a href="/">back</a>
        </p>
        <p>Settings</p>
      </Row>
    </Stack>
  );
};

const BarSettingsForm = (props) => {
  let navigate = useNavigate();

  // added for Settings A3
  const [inputownerpin, SetOwnerPin] = React.useState("");
  const [inputAddress, SetAddress] = React.useState("");
  const [inputcity, SetCity] = React.useState("");
  const [inputstate, SetState] = React.useState("");
  const [inputzip, SetZip] = React.useState("");

  const ownerpin = React.useRef(null);
  const address = React.useRef(null);
  const city = React.useRef(null);
  const businessstate = React.useRef(null);
  const zip = React.useRef(null);

  const handleOnwerPinChange = () => {
    SetOwnerPin(ownerpin.current.value);
  };

  const handleAddressChange = () => {
    SetAddress(address.current.value);
  };

  const handleCityChange = () => {
    SetCity(city.current.value);
  };

  const handleStateChange = () => {
    SetState(businessstate.current.value);
  };

  const handleZipChange = () => {
    SetZip(zip.current.value);
  };

  const handleBarSettings = () => {
    if (inputownerpin === "") {
      alert("Enter Owner Pin");
      ownerpin.current.focus();
      return;
    }
    if (inputAddress === "") {
      alert("Enter Address");
      address.current.focus();
      return;
    }
    if (inputcity === "") {
      alert("Enter City");
      city.current.focus();
      return;
    }
    if (inputstate === "") {
      alert("Enter State");
      businessstate.current.focus();
      return;
    }
    if (inputzip === "") {
      alert("Enter Zipcode");
      zip.current.focus();
      return;
    }
    alert("Bar Settings updated Successfully!");
  };

  const handleDeleteAccount = () => {
    alert("Delete Account is not implemented yet!");
  };
  return (
    <Stack>
      <Row className="bodyContent">
        <div className="row desc">
          <div className="row">
            <p>TheWinkingSkeever</p>
          </div>
          <div className="row">
            <p>22 Red St., Greensboro, North Carolina, 27215</p>
          </div>
        </div>
      </Row>
      <Row className="bodyContent">
        <Stack>
          Owner Pin{" "}
          <input
            id="ownerpin"
            type="text"
            placeholder=" "
            ref={ownerpin}
            onChange={handleOnwerPinChange}
          />
        </Stack>
      </Row>
      <Row className="bodyContent">
        <Stack>
          Merchant Address{" "}
          <input
            id="address"
            type="text"
            placeholder="(input business address)"
            ref={address}
            onChange={handleAddressChange}
          />
          <input
            id="city"
            type="text"
            placeholder="(input business city)"
            ref={city}
            onChange={handleCityChange}
          />
          <input
            id="State"
            type="text"
            placeholder="(insert business state)"
            ref={businessstate}
            onChange={handleStateChange}
          />
          <input
            id="zip"
            type="text"
            placeholder="(insert business zip)"
            ref={zip}
            onChange={handleZipChange}
          />
        </Stack>
      </Row>
      <Stack className="bodyContent">
        <button onClick={handleBarSettings} variant="primary">
          Update
        </button>
      </Stack>
      <Stack className="bodyContent">
        <button onClick={handleDeleteAccount} variant="primary">
          Delete Account
        </button>
      </Stack>
    </Stack>
  );
};
const BarSettings = (props) => {
  return (
    <div>
      <div id="barsetting_page">
        <div className="wrapper column">
          <BarSettingsHeader />
          <BarSettingsForm applicationState={props.applicationState} />
        </div>
      </div>
    </div>
  );
};

export default BarSettings;
