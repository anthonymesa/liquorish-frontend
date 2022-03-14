import './Home.css';

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FiMenu } from 'react-icons/fi'
import { Row, Stack, Button, Alert, Image, Col } from 'react-bootstrap';

const Header = (props) => {

  return (
    <div>
      Header
      {props.username}
    </div>
  )
}

const BarList = (props) => {

  return (
    <div>
      Barlist
      {
        props.bar_list.map((bar_data) => {
          <div className="bar_list_item" onClick={() => { /*handleClickBar(bar_data)*/ }}>
            <div>
              <h2>{bar_data["bar_name"]}</h2>
            </div>
            <div>
              <p>{bar_data["address_street"]}</p>
            </div>
          </div>
        })
      }
    </div>
  )
}

/**
 * The main home module
 * 
 * @param {} props 
 * @returns 
 */
const Home = (props) => {

  const [username, setUsername] = React.useState("");
  const [bar_list, setBarList] = React.useState([])

  useEffect(() => {
     (async () => {
      const client_id = sessionStorage.getItem('client_id');

      const url = 'http://liquorish-server.azurewebsites.net/user/' + client_id;

      const response = await fetch(url);
      const jsonResponse = await response.json();

      // need to handle the case where this returns in error

      setUsername(jsonResponse.value['username']);
    })();

    (async () => {
      const client_id = sessionStorage.getItem('client_id');

      const url = 'http://liquorish-server.azurewebsites.net/bars/' + client_id

      const response = await fetch(url);
      const jsonResponse = await response.json();

      // need to handle the case where this returns in error

      setBarList(jsonResponse.value)
    })();
  }, []);

  return (
    <div className="root" id="home-root">
      <Header username={username} />
      <BarList bar_list={bar_list} />
    </div>
  )
}

//  Eport the function to be called elsewhere
export default Home;
