import './Home.css';

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FiMenu } from 'react-icons/fi'
import { Row, Col } from 'react-bootstrap';

const Header = (props) => {

  return (
    <Row className="header">
    <Col id="greeting">
      <Row><h3>Welcome { props.username }</h3></Row>
    </Col>
    <Col id="settings_button">
      <FiMenu size="2em" onClick={ () => { console.log("go to settings...")} }/>
    </Col>
  </Row>
  )
}

const getBarList = new Promise(async (resolve, reject) => {
  let client_id = sessionStorage.getItem('client_id');

  const url = 'http://liquorish-server.azurewebsites.net/bars/' + client_id;

  const response = await fetch(url);
  const jsonResponse = await response.json();

  resolve(jsonResponse.value)
});

const BarList = (props) => {
  const [bar_list, setBarList] = React.useState([])
  let navigate = useNavigate();

  getBarList.then((_bar_list) => {
    console.log(_bar_list)
    setBarList(_bar_list);
  });
  
  const handleClickBar = (_bar_data) => {
    sessionStorage.setItem('bar', JSON.stringify(_bar_data));
    navigate("../dashboard", { replace: true });
  }

  const bar_list_dom = bar_list.map((bar_data) =>
    <div key={JSON.stringify(bar_data)} className="bar_list_item" onClick={() => { handleClickBar(bar_data) }}>
      <Row>
        <h2>{bar_data.bar_name}</h2>
      </Row>
      <Row>
        <p>{bar_data.address_street}, 
        { bar_data.address_city}, 
        { bar_data.address_state }, 
        { bar_data.address_zip }</p>
      </Row>
    </div>
  );

  return (
    <div>
      {bar_list_dom}
    </div>
  )
}

const getUserData = new Promise(async (resolve, reject) => {
  let client_id = sessionStorage.getItem('client_id');

  const url = 'http://liquorish-server.azurewebsites.net/user/' + client_id;

  const response = await fetch(url);
  const jsonResponse = await response.json();

  resolve(jsonResponse.value)
});

/**
 * The main home module
 * 
 * @param {} props 
 * @returns 
 */
const Home = (props) => {

  const [user_data, setUserData] = React.useState({});

  useEffect(() => {

    getUserData.then((_user_data) => {
      setUserData(_user_data)
    })

  }, []);

  return (
    <div className="root" id="home-root">
      <Header username={user_data["username"]} />
      <BarList user_id={user_data["id"]} />
    </div>
  )
}

//  Eport the function to be called elsewhere
export default Home;
