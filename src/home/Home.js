import './Home.css';

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FiMenu } from 'react-icons/fi'
import { Row, Col } from 'react-bootstrap';
import HeaderV2 from '../headerv2/HeaderV2';

//==============================================================================
//  Module - Home
//==============================================================================

/**
 * The main home module
 */
 export default function Home(){

  const navigate = useNavigate();

  const [user_data, setUserData] = React.useState({});
  const [page_ready, setPageReady] = React.useState(false);

  /**
   * Gets the8 users data via API call. specifically, this checks to see if the 
   * client id is set in storage first. if it isn't then the promise is rejected,
   * and the user should be logged out, as client_id is only set on login.
   */
  const getUserData = () => {
    return new Promise(async (resolve, reject) => {

      const client_id = JSON.parse(sessionStorage.getItem('client_id'));

      if (client_id > 0) {
        const url = 'https://liquorish-server.azurewebsites.net/user/' + client_id;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        resolve(jsonResponse.value);
      } else {
        reject();
      }
    });
  };

  /**
   * useEffect runs the provided callback once on page load
   */
  useEffect(() => {
    getUserData().then((_user_data) => {

      // This function runs on 'resolve'

      setUserData(_user_data);
      setPageReady(true);
    }, () => {
      
      // This funciton runs on 'reject', removing user auth and redirecting them
      // to the login.

      sessionStorage.removeItem('is_auth');
      navigate("/", { replace: true });
    })
  }, []);

  return (
    <div className="root">
      {page_ready &&
        <div>
          <HeaderV2
            does_nav={false}
            title={"Welcome " + user_data["username"]}
            elements={[
              <FiMenu size="2em" onClick={() => { console.log("go to settings...") }} />
            ]}
          />
          <BarList user_id={user_data["id"]} />
        </div>
      }
    </div>
  )
}

//==============================================================================
//  Module - BarList
//==============================================================================

/**
 * Bar list that is propagated dynamically
 */
function BarList(){

  /**
   * Using navigate allows us to navigate pages
   */
  const navigate = useNavigate();

  /**
   * The bar_list state is an array of bar objects to be displayed
   */
  const [bar_list, setBarList] = React.useState([])
  const [element_ready, setElementReady] = React.useState(false);

  /**
   * Get the list of bars that will be used for generating the bar list dom.
   */
  const getBarList = () => {
    return new Promise(async (resolve, reject) => {

      const client_id = sessionStorage.getItem('client_id');
      const url = 'https://liquorish-server.azurewebsites.net/bars/' + client_id;
      const response = await fetch(url);
      const jsonResponse = await response.json();

      resolve(jsonResponse.value)
    });
  }

  /**
   * This function is declared within this module, instead of removing it as a seperate
   * function outside the module, so that 'navigate' is in scope, as navigate 
   * can only be declared within a React module.
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
      setElementReady(true);
    }, () => {

      // This code runs on 'reject'

      setElementReady(false);
    })
  }, []);

  return (element_ready &&
    <div>
      {bar_list}
    </div>
  )
}

//==============================================================================
//  Functions
//==============================================================================

function makeGetRequest(url) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    resolve(jsonResponse.value)
  });
}