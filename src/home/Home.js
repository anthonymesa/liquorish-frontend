import './Home.css';

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FiMenu } from 'react-icons/fi'
import { Row, Col } from 'react-bootstrap';

/**
 * Header that sits at the top of the page.
 * 
 * @param {*} props 
 * @returns 
 */
const Header = (props) => {
  return (
    <Row className="g-0 header">
      <Col id="greeting">
        <Row><h3>Welcome {props.username}</h3></Row>
      </Col>
      <Col id="settings_button">
        <FiMenu size="2em" onClick={() => { console.log("go to settings...") }} />
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

  const getBarList = () => {
    return new Promise(async (resolve, reject) => {
      console.log("Home::BarList.getBarList() - getting bar list...");

      const client_id = sessionStorage.getItem('client_id');

      const url = 'http://liquorish-server.azurewebsites.net/bars/' + client_id;

      const response = await fetch(url);
      const jsonResponse = await response.json();

      resolve(jsonResponse.value)
    });
  }

  /**
   * This state variable is an array of bar objects to be displayed
   */
  const [bar_list, setBarList] = React.useState([])
  const [element_ready, setElementReady] = React.useState(false);

  /**
   * Using navigate allows us to navigate pages
   */
  const navigate = useNavigate();

  /**
   * This function is declared within this module, instead of removing it as a seperate
   * function outside the module, so that 'navigate' is in scope, as navigate 
   * can only be declared within a React module.
   * 
   * @param {*} _bar_data 
   */
  const handleClickBar = (_bar_data) => {
    sessionStorage.setItem('bar', JSON.stringify(_bar_data));
    navigate("/dashboard", { replace: true });
  }

  /**
   * useEffect runs the provided callback once on page load
   */
  useEffect(() => {
    getBarList().then((_bar_list) => {

      console.log("Home::BarList.useEffect([]).getBarList.then().resolve() - Retrieved bar list: " + JSON.stringify(_bar_list));
      console.log("Home::BarList.useEffect([]).getBarList.then().resolve() - Setting bar list to state...");


        /**
   * Dynamically create a list of divs that represent our bar objects by iterating
   * across the list of bar objects using .map().
   */
        const bar_list_dom = _bar_list.map((bar_data) =>
  <div key={JSON.stringify(bar_data)} className="bar_list_item" onClick={() => { handleClickBar(bar_data) }}>
    <Row className="g-0">
      <h2>{bar_data.bar_name}</h2>
    </Row>
    <Row className="g-0">
      <p>{bar_data.address_street},
        {bar_data.address_city},
        {bar_data.address_state},
        {bar_data.address_zip}</p>
    </Row>
  </div>
);

      setBarList(bar_list_dom);

      console.log("Home::BarList.useEffect([]).getBarList.then().resolve() - Home::BarList is ready to load...");

      setElementReady(true);
    }, () => {

      console.log("Home::BarList.useEffect([]).getBarList.then().reject() - Rejected, not rendering bar list...");

      setElementReady(false);
    })
  }, []);



  return (element_ready &&
    <div>
      {bar_list}
    </div>
  )
}

/**
 * The main home module
 * 
 * @param {} props 
 * @returns 
 */
const Home = () => {

  /**
   * State for home component
   */
  const [user_data, setUserData] = React.useState({});
  const [page_ready, setPageReady] = React.useState(false);

  const navigate = useNavigate();

  const getUserData = () => {
    return new Promise(async (resolve, reject) => {
      console.log("Home::getUserData() - getting user data...");

      const client_id = JSON.parse(sessionStorage.getItem('client_id'));

      console.log("Home::getUserData() - client_id from storage: " + client_id);

      if (client_id > 0) {

        const url = 'http://liquorish-server.azurewebsites.net/user/' + client_id;

        console.log("Home::getUserData() - API call url: " + url);

        const response = await fetch(url);
        const jsonResponse = await response.json();

        console.log("Home::getUserData() - json response: " + JSON.stringify(jsonResponse.value));
        console.log("Home::getUserData() - resolving...");

        resolve(jsonResponse.value);
      } else {

        console.log("Home::getUserData() - rejecting...");
        reject();
      }
    });
  };

  /**
   * useEffect runs the provided callback once on page load
   */
  useEffect(() => {
    getUserData().then((_user_data) => {

      console.log("Home::useEffect([]).getUserData.then().resolve() - Retrieved client data: " + JSON.stringify(_user_data));
      console.log("Home::useEffect([]).getUserData.then().resolve() - Setting data to state...");

      setUserData(_user_data);

      console.log("Home::useEffect([]).getUserData.then().resolve() - Home is ready to load...");

      setPageReady(true);
    }, () => {

      console.log("Home::useEffect([]).getUserData.then().reject() - Rejected, removing is_auth from storage, redirecting to login page...");

      /**
       * On reject, the auth value is removed, forcing the user back to log out.
       */
      sessionStorage.removeItem('is_auth');
      navigate("/", { replace: true });
    })
  }, []);

  return (
    <div className="root" id="home-root">
      {page_ready &&
        <div>
          <Header username={user_data["username"]} />
          <BarList user_id={user_data["id"]} />
        </div>
      }
    </div>
  )
}

//  Eport the function to be called elsewhere
export default Home;
