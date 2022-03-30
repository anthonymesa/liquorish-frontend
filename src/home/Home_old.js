import './Home.css';

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FiMenu } from 'react-icons/fi'
import { Row, Stack, Button, Alert, Image, Col } from 'react-bootstrap';

const Header = (props) => {
  let username = (props === null ? 'unknown' : props.username);
  
  return (
    <Row className="header">
      <Col id="greeting">
        <Row>Welcome { username }</Row>
      </Col>
      <Col id="settings_button">
        <FiMenu size="2em" onClick={ () => { console.log("go to settings...")} }/>
      </Col>
    </Row>
  )
}

const getBarsNearMe = async (user_id) => {
  const url = 'http://liquorish-server.azurewebsites.net/bars/' + user_id

  fetch(url).then(response => {
    if(response.ok) {
      return response.json();
    }
  }).then(data => {
    if(data.status == 0)
    {
      console.log(data)
      return data.value
    } else {
      return null
      // catch the case a status error is returned.
    }
  });
}

const BarList = (props) => {
  let navigate = useNavigate();

  const handleClickBar = (bar_data) => {
    sessionStorage.setItem('bar', JSON.stringify(bar_data));
    navigate("../dashboard", { replace: true });
  }

  console.log(props.user_id)

  const bars_near_me = async () => {
    await getBarsNearMe(props.user_id)
  }

  console.log(bars_near_me())

  const barListItems = bars_near_me().map((bar_data) =>
    <div className="bar_list_item" onClick={ () => { handleClickBar(bar_data) }}>
      <Row>
        <h2>{ bar_data.name }</h2>
      </Row>
      <Row>
        <p>{ bar_data.address }</p>
      </Row>
    </div>
  );

  return (
    <div>
      { barListItems }
    </div>
  )
}

const Home = (props) => {

  const [user_id, setUserId] = React.useState("");
  const [username, setUsername] = React.useState("");

  // useEffect(() => {
  //   initializeHome((data, user_id) => {
  //     setUserId(user_id)
  //     setUsername(data.value["username"])
  //     sessionStorage.setItem('user-dat', JSON.stringify(data.value))
  //   })
  // }, []);

  const initializeHome = async () => {
    let client_id = sessionStorage.getItem('client_id');
  
    const url = 'http://liquorish-server.azurewebsites.net/user/' + client_id;
  
    fetch(url).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(data => {
      console.log('did it')
      setUserId(client_id)
      setUsername(data.value["username"])
      sessionStorage.setItem('user-dat', JSON.stringify(data.value))
    });
  }

  return (
    <div className="root" id="home-root">
      <Header username={username}/>
      <BarList user_id={user_id}/>
    </div>
  )
}

//  Eport the function to be called elsewhere
export default Home;
