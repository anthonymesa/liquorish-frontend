import './Home.css'

import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { FiMenu } from 'react-icons/fi'
import { Row } from 'react-bootstrap'
import HeaderV2 from '../headerv2/HeaderV2'
import PollingLayer from '../polling_layer/PollingLayer'

//==============================================================================
//  Module - Home
//==============================================================================

/**
 * The main home module
 */
export default function Home() {

  const navigate = useNavigate();

  const [user_data, setUserData] = React.useState({});
  const [is_loaded, setIsLoaded] = React.useState(false);

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
      setIsLoaded(true);
    }, () => {

      // This funciton runs on 'reject', removing user auth and redirecting them
      // to the login.

      sessionStorage.removeItem('is_auth');
      navigate("/", { replace: true });
    })
  }, []);

  return (
    <div className="root">
      {is_loaded &&
        <div>
          <HeaderV2
            does_nav={false}
            title={"Welcome " + user_data["username"]}
            elements={[
              <FiMenu size="2em" onClick={() => { navigate('/home/user/settings') }} />
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
function BarList() {

  const [bar_list, setBarList] = React.useState([])
  const [is_loaded, setIsLoaded] = React.useState(false)

  /**
   *  Only runs on initial component mount
   */
  useEffect(() => {
    const client_id = sessionStorage.getItem('client_id')
    intializeBarList(client_id)
  }, []);

  /**
   *  Creating this handle here so that it can be used in both useEffect and 
   *  updateBarList below.
   */
  const intializeBarList = (_client_id) => getBarList(_client_id).then(generateBarList, clearBarList)

  /**
   *  Converts the provided list of bar objects into a list of corresponding
   *  JSX elements and returns it.
   */
  const generateBarListDom = (_bar_list) => {
    return _bar_list.map((bar_data, index) => <BarListElement bar_data={bar_data} index={index} />)
  }

  /**
   * Gets the bar list JSX dom to display and updates the module state with said 
   * JSX dom, then sets is_loaded to true to refresh the page.
   */
  const generateBarList = (_bar_list) => {
    const bar_list_dom = generateBarListDom(_bar_list)
    setBarList(bar_list_dom);
    setIsLoaded(true);
  }

  /**
   * Turns off the bar list from rendering by setting is_loaded to false.
   */
  const clearBarList = () => { setIsLoaded(false) }

  /**
   * Get the list of bars that will be used for generating the bar list dom.
   */
  const getBarList = (_client_id) => {
    return new Promise(async (resolve, reject) => {
      const url = 'https://liquorish-server.azurewebsites.net/bars/' + _client_id;
      const response = await fetch(url);
      const jsonResponse = await response.json();
      resolve(jsonResponse.value)
    });
  }

  const updateBarList = () => {
    const client_id = sessionStorage.getItem('client_id')
    intializeBarList(client_id)
  }

  /**
   * Display the bar list only if the content is loaded.
   */
  return (is_loaded &&
    <div>
      { bar_list }

      <PollingLayer polling_time={1000} timeout_ref={'bar_list_poll'} action={ updateBarList }/>
    </div>
  )
}

//==============================================================================
//  Module - BarListElement
//==============================================================================

/**
 *  This module defines a single element of the bar list.
 */
function BarListElement({ bar_data: _bar_data, index: _index }) {

  // Required to be able to navigate onClick
  const navigate = useNavigate()

  /**
   *  Set bar_data to sessionStorage and then go to the dashboard.
   */
  const handleClickBar = (_bar_data) => {
    sessionStorage.setItem('bar', JSON.stringify(_bar_data));
    navigate("/dashboard", { replace: true });
  }

  return (
    <div key={JSON.stringify(_bar_data.id) + _index} className="bar_list_item" onClick={() => { handleClickBar(_bar_data) }}>
      <Row className="g-0">
        <h2>{_bar_data.bar_name}</h2>
      </Row>
      <Row className="g-0">
        <p>
          {_bar_data.address_street},
          {_bar_data.address_city},
          {_bar_data.address_state},
          {_bar_data.address_zip}
        </p>
      </Row>
    </div>
  )
}