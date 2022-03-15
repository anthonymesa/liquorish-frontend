
import './Dashboard.css';
import React, { useEffect } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';
import { Row, Col, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const BarHead = (props) => {
  const navigate = useNavigate();

  const handleHome = () => {
    sessionStorage.removeItem('bar')
    navigate("/home/user", { replace: true }); 
  }

  return (
    <Row className="g-0" id="bar_head">
      <Stack>
        <div className="header">
          <div id="home_nav" onClick={() => { handleHome() }}>
            <FiChevronLeft /> Home
          </div>
        </div>
        <div id="bar_info">
          <div id="bar_info_container">
            <h1>{props.bar["bar_name"]}</h1>
            <p>{props.bar["address_street"]}, {props.bar["address_city"]}, {props.bar["address_state"]}, {props.bar["address_zip"]}</p>
          </div>
        </div>
      </Stack>
    </Row>
  )
}

const TabPay = () => {

  const handleSignIn = () => {
    console.log("paying for tab...")
  }

  return (
    <Row className="g-0" id="tab_pay">
      <Button className="login-button" variant="primary" onClick={handleSignIn}>Pay for tab</Button>
    </Row>
  )
}

// const getTabDrinks = new Promise(async (resolve, reject) => {
//   const client_id = sessionStorage.getItem('client_id');

//   const url = 'http://liquorish-server.azurewebsites.net/user/' + client_id;

//   const response = await fetch(url);
//   const jsonResponse = await response.json();

//   resolve(jsonResponse.value)
// });


const TabList = (props) => {

  // const [tab_drinks, setTabDrinks] = React.useState([])

  // getTabDrinks.then((_tab_drinks) => {
  //   console.log(_tab_drinks)
  //   setTabDrinks(_tab_drinks);
  // });

  // const tab_drinks_dom = tab_drinks.map((drink_data) => {
  //   <div>
  //     <Row>
  //       <h2>{drink_data["drink_name"]}</h2>
  //     </Row>
  //   </div>
  // });

  return (
    <Row className="g-0" id="tab_list">
      {/* {tab_drinks_dom} */}
    </Row>
  )
}

const AddItemToOrder = () => {
  return (
    <div id="add_item_to_order">
      <FiPlusCircle size={"4em"} />
    </div>
  )
}

const getTab = (client_id, bar_id) => {
  return new Promise(async (resolve, reject) => {

    const url = 'http://liquorish-server.azurewebsites.net/tab/' + client_id + '/' + bar_id;

    const response = await fetch(url);
    const jsonResponse = await response.json();

    resolve(jsonResponse.value);
  })
}

const Dashboard = () => {

  const [user_id, setUserId] = React.useState("");
  const [bar, setBar] = React.useState("");

  /**
   * The tab id is being maintained here at the Dashboard level so that this
   * call only needs to be made once and can be saved to the session storage.
   */
  const [tab_id, setTabId] = React.useState("");

  useEffect(() => {
    let client_id = JSON.parse(sessionStorage.getItem('client_id'));
    setUserId(client_id);

    let bar = JSON.parse(sessionStorage.getItem('bar'));
    setBar(bar);
  }, []);

  return (
    <div className="root" id="dashboard_root">
      <Stack id="dashboard_contents">
        <BarHead bar={bar} />
        <TabPay tab_id={tab_id} user_id={user_id} />
        <TabList bar_id={bar["id"]} user_id={user_id} />
      </Stack>
      <AddItemToOrder />
    </div>
  )
}

export default Dashboard