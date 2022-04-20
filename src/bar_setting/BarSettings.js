//import './Settings.css';
import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
//import ValidateAuth from "../Auth";
import { useNavigate } from "react-router-dom";
//import {  Row, Stack, Button, Alert, Image  } from 'react-bootstrap';
import { Row, Stack } from "react-bootstrap";

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

  const bar_id = JSON.parse(sessionStorage.getItem('client_id'));
  console.log(bar_id);

  const [bar_details, setBarDetails] = React.useState(null)
  const [is_loaded, setIsLoaded] = React.useState(false)

  const getBarDetails = (bar_id) => {
    return new Promise(async (resolve, reject) => {

      const url = 'https://liquorish-server.azurewebsites.net/getBar/' + bar_id

      const response = await fetch(url);
      const jsonResponse = await response.json();
      console.log(jsonResponse.value);
      resolve(jsonResponse.value)
    });
  }

  useEffect(() => {
    getBarDetails(bar_id).then((_bar_details) => {
      setBarDetails(_bar_details)
        setIsLoaded(true)
    })
  }, [])

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

      const post_args = {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
  
        //make sure to serialize your JSON body
        body: JSON.stringify({
          bar_id: bar_id,
          address_street: inputAddress,
          address_city: inputcity,
          address_state: inputstate,
          address_zip: inputzip,
          owner_pass: inputownerpin,
        })
      }
  
      console.log("update bar settings")
  
      fetch("https://liquorish-server.azurewebsites.net/updateBar", post_args).then((response) => {
  
        console.log(response.json)
      });

    alert("Bar Settings updated Successfully!");
  };

  const handleDeleteAccount = () => {
    const post_args = {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        bar_id: bar_id
      })
    }

    console.log("update bar settings")

    fetch("https://liquorish-server.azurewebsites.net/deleteBar", post_args).then((response) => {

      console.log(response.json)
    });

  alert("Bar deleted Successfully!");
  };
  
  return (
    <Stack>
      <Row className="bodyContent">
        <div className="row desc">
          <div className="row">
            <p>{bar_details.bar_name}</p>
          </div>
          <div className="row">
            <p>{bar_details.address_street}, {bar_details.address_city}, {bar_details.address_state}, {bar_details.address_zip}</p>
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
