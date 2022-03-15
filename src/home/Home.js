import './Home.css';

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FiMenu } from 'react-icons/fi'
import { Row, Col } from 'react-bootstrap';

/**
 * Promises for connecting to the backend
 */

// Maybe these promises should be moved to a single 'getBackendData' function
// that is passed a url so that this can be generalized without repeating code.

const getUserData = new Promise(async (resolve, reject) => {
  const client_id = sessionStorage.getItem('client_id');

  const url = 'http://liquorish-server.azurewebsites.net/user/' + client_id;

  const response = await fetch(url);
  const jsonResponse = await response.json();

  resolve(jsonResponse.value)
});

const getBarList = new Promise(async (resolve, reject) => {
  const client_id = sessionStorage.getItem('client_id');

  const url = 'http://liquorish-server.azurewebsites.net/bars/' + client_id;

  const response = await fetch(url);
  const jsonResponse = await response.json();

  resolve(jsonResponse.value)
});

/**
 * Header that sits at the top of the page.
 * 
 * @param {*} props 
 * @returns 
 */
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

/**
 * Bar list that is propagated dynamically
 * 
 * @param {*} props 
 * @returns 
 */
const BarList = (props) => {

  /**
   * This state variable is an array of bar objects to be displayed
   */
  const [bar_list, setBarList] = React.useState([])

  /**
   * Using navigate allows us to navigate pages
   */
  const navigate = useNavigate();

  /**
   * Run the getBarList function. It returns a promise, after the promise is completed,
   * set the state for the bar list.
   */
  getBarList.then((_bar_list) => {
    console.log(_bar_list)
    setBarList(_bar_list);
  });
  
  /**
   * This function is declared within this module, instead of removing it as a seperate
   * function outside the module, so that 'navigate' is in scope, as navigate 
   * can only be declared within a React module.
   * 
   * @param {*} _bar_data 
   */
  const handleClickBar = (_bar_data) => {
    sessionStorage.setItem('bar', JSON.stringify(_bar_data));
    navigate("../dashboard", { replace: true });
  }

  /**
   * Dynamically create a list of divs that represent our bar objects by iterating
   * across the list of bar objects using .map().
   */
  const bar_list_dom = bar_list.map((bar_data) =>
    <div key={ JSON.stringify(bar_data) } className="bar_list_item" onClick={() => { handleClickBar(bar_data) }}>
      <Row>
        <h2>{ bar_data.bar_name }</h2>
      </Row>
      <Row>
        <p>{ bar_data.address_street }, 
        { bar_data.address_city}, 
        { bar_data.address_state }, 
        { bar_data.address_zip }</p>
      </Row>
    </div>
  );

  return (
    <div>
      { bar_list_dom }
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

  /**
   * State for home component
   */
  const [user_data, setUserData] = React.useState({});

  /**
   * useEffect runs the provided callback once on page load
   */
  useEffect(() => {

    getUserData.then((_user_data) => {
      setUserData(_user_data)
    })

  }, []);

  return (
    <div className="root" id="home-root">
      <Header username={ user_data["username"] } />
      <BarList user_id={ user_data["id"] } />
    </div>
  )
}

//  Eport the function to be called elsewhere
export default Home;
