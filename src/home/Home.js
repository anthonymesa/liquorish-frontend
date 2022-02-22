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

const getBarsNearMe = (user_id) => {
  return [
    {
      id: 183,
      name: "The Winking Skeever",
      address: "3782 W Aldermont, Greensboro, NC, 27213",
      description: "Check out our mint collection of dead rats!"
    },
    {
      id: 23,
      name: "Hillbilly Hollar",
      address: "3 Tooth dr, Burlington, NC, 28472",
      description: "Lotta hootin and hollerin around these parts!"
    },
    {
      id: 18,
      name: "The other One",
      address: "18 Bad Milk st., High Point, NC, 12734",
      description: "Honestly I don't even know anymore"
    }
  ]
}

const BarList = (props) => {
  let navigate = useNavigate();

  const handleClickBar = (bar_data) => {
    sessionStorage.setItem('bar', JSON.stringify(bar_data));
    navigate("../dashboard", { replace: true });
  }

  const bars_near_me = getBarsNearMe(props.user_id);

  const barListItems = bars_near_me.map((bar_data) =>
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

  useEffect(() => {
    let client_id = sessionStorage.getItem('client_id');

    setUserId(client_id);

    const url = 'http://liquorish-server.azurewebsites.net/user/' + client_id;

    fetch(url).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(data => {
      setUsername(data.username);
      sessionStorage.setItem('user-dat', JSON.stringify(data));
    });
  }, []);

  return (
    <div className="root" id="home-root">
      <Header username={username}/>
      <BarList user_id={user_id}/>
    </div>
  )
}

//  Eport the function to be called elsewhere
export default Home;
