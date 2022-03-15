
import './Dashboard.css';
import React, { useEffect } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';
import { Row, Col, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const BarHead = (props) => {
  const navigate = useNavigate();

  return (
    <Row className="g-0" id="bar_head">
      <Stack>
        <div className="header">
          <div id="home_nav" onClick={() => { navigate("/home/user", { replace: true });}}>
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
  return (
    <Row className="g-0" id="tab_pay"></Row>
  )
}

const getSavedDrinks = (tab_id, user_id) => {
  return [
    {
      id: 13,
      name: "Classic Whisky Sour",
      price: 14.23,
      status: 0
    },
    {
      id: 3,
      name: "Jameson and Ginger",
      price: 8.2,
      status: 1
    }
  ]
}

const TabList = (props) => {
  const saved_drinks = getSavedDrinks(props.user_id);

  const savedDrinks = saved_drinks.map((drink_data) => {
    <div>
      <Row>
        <h2>{drink_data.name}</h2>
      </Row>
    </div>
  });

  return (
    <Row className="g-0" id="tab_list">
      {savedDrinks}
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

    // getTab(client_id, bar["id"]).then((_tab) => {
    //   setTabId(_tab["id"]);
    // })

  }, []);

  return (
    <div className="root" id="dashboard_root">
      <Stack id="dashboard_contents">
        <BarHead bar={bar} />
        <TabPay tab_id={tab_id} user_id={user_id} />
        <TabList tab_id={tab_id} user_id={user_id} />
      </Stack>
      <AddItemToOrder />
    </div>
  )
}

export default Dashboard