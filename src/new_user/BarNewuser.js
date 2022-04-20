//import './Settings.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import ValidateAuth from "../Auth";
import { useNavigate } from "react-router-dom";
//import {  Row, Stack, Button, Alert, Image  } from 'react-bootstrap';
import { Row, Stack } from "react-bootstrap";

const BarNewUserHeader = () => {
  return (
    <Stack id="newuser_header">
      <Row id="row-header">
        <p>
          <a href="/">back</a>
        </p>
        <p>Set-up New User</p>
      </Row>
    </Stack>
  );
};

const BarFormNewuser = (props) => {
  let navigate = useNavigate();

  // added for Settings A3
  const [inputusername, SetUserName] = React.useState("");
  const [inputfirstname, SetFirstName] = React.useState("");
  const [inputmiddlename, SetMiddleName] = React.useState("");
  const [inputlastname, SetLastName] = React.useState("");
  const [inputdob, SetDOB] = React.useState("");
  const [inputusercity, SetUserCity] = React.useState("");
  const [inputuserstate, SetUserState] = React.useState("");
  const [inputpassword, SetUserPassword] = React.useState("");
  const [inputconfirmpassword, SetUserConfirmPassword] = React.useState("");

  const username = React.useRef(null);
  const firstname = React.useRef(null);
  const middlename = React.useRef(null);
  const lastname = React.useRef(null);
  const dob = React.useRef(null);
  const usercity = React.useRef(null);
  const userstate = React.useRef(null);
  const userpassword = React.useRef(null);
  const confirmuserpassword = React.useRef(null);

  const handleUserNameChange = () => {
    SetUserName(username.current.value);
  };

  const handleFirstNameChange = () => {
    SetFirstName(firstname.current.value);
  };

  const handleMiddleNameChange = () => {
    SetMiddleName(middlename.current.value);
  };

  const handleLastNameChange = () => {
    SetLastName(lastname.current.value);
  };

  const handleDOBChange = () => {
    SetDOB(dob.current.value);
  };

  const handleUserCityChange = () => {
    SetUserCity(usercity.current.value);
  };

  const handleUserStateChange = () => {
    SetUserState(userstate.current.value);
  };

  const handleUserPasswordChange = () => {
    SetUserPassword(userpassword.current.value);
  };

  const handleConfirmPasswordChange = () => {
    SetUserConfirmPassword(confirmuserpassword.current.value);
  };

    const handleAddUser = () => {
        if (inputusername === "") {
            alert("Enter User Name");
            username.current.focus();
            return;
        }
        if (inputfirstname === "") {
            alert("Enter First Name");
            firstname.current.focus();
            return;
        }
        if (inputlastname === "") {
            alert("Enter Last Name");
            lastname.current.focus();
            return;
        }
        if (inputmiddlename.length > 1) {
            alert("Just enter middle initial only");
            middlename.current.focus();
            return;
        }
        if (inputdob === "") {
            alert("Enter Date of Birth");
            dob.current.focus();
            return;
        }
        if (inputusercity === "") {
            alert("Enter City");
            usercity.current.focus();
            return;
        }
        if (inputuserstate === "") {
            alert("Enter State");
            userstate.current.focus();
            return;
        }
        if (inputpassword === "") {
            alert("Enter Password");
            userpassword.current.focus();
            return;
        }
        if (inputconfirmpassword === "") {
            alert("Enter Password");
            confirmuserpassword.current.focus();
            return;
        }
        if (inputpassword !== inputconfirmpassword) {
            alert("Passwords do not match.");
            userpassword.current.focus();
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
          username: inputusername,
          name_first: inputfirstname,
          name_last: inputlastname,
          birth_date: inputdob,
          address_city: inputusercity,
          address_state: inputuserstate,
          password: inputpassword,
        })
      }
  
      console.log("BarNewUser")
  
      fetch("https://liquorish-server.azurewebsites.net/addBarUser", post_args).then((response) => {
  
        console.log(response.json)
      });

    alert("Bar User added Successfully!");
  };

  return (
    <Stack>
      <Row className="bodyContent">
        <Stack>
          UserName{" "}
          <input
            id="username"
            type="text"
            placeholder="(inputusername)"
            ref={username}
            onChange={handleUserNameChange}
          />
          First Name{" "}
          <input
            id="firstname"
            type="text"
            placeholder="(inputfirstname)"
            ref={firstname}
            onChange={handleFirstNameChange}
          />
          M.{" "}
          <input
            id="middlename"
            type="text"
            placeholder="(inputmiddleinitial)"
            ref={middlename}
            onChange={handleMiddleNameChange}
          />
          Last Name{" "}
          <input
            id="lastnamename"
            type="text"
            placeholder="(inputlastname)"
            ref={lastname}
            onChange={handleLastNameChange}
          />
          Birth Date{" "}
          <input
            id="dob"
            type="text"
            placeholder="(DateOfBirth - MM/DD/YYYY)"
            ref={dob}
            onChange={handleDOBChange}
          />
          City{" "}
          <input
            id="usercity"
            type="text"
            placeholder="(usercity)"
            ref={usercity}
            onChange={handleUserCityChange}
          />
          State{" "}
          <input
            id="userstate"
            type="text"
            placeholder="(userstate)"
            ref={userstate}
            onChange={handleUserStateChange}
          />
          Password{" "}
          <input
            id="userpassword"
            type="password"
            placeholder="(password)"
            ref={userpassword}
            onChange={handleUserPasswordChange}
          />
          Confirm Password{" "}
          <input
            id="confirmuserpassword"
            type="password"
            placeholder="(confirmpassword)"
            ref={confirmuserpassword}
            onChange={handleConfirmPasswordChange}
          />
        </Stack>
      </Row>
        <Stack className="bodyContent">
          <button onClick={handleAddUser} variant="primary">
            Confirm
          </button>
        </Stack>
    </Stack>
  );
};
const BarNewuser = (props) => {
  return (
    <div>
      <div id="newuser_page">
        <div className="wrapper column">
          <BarNewUserHeader />
          <BarFormNewuser applicationState={props.applicationState} />
        </div>
      </div>
    </div>
  );
};

export default BarNewuser;

// end of additions for Settings A3
