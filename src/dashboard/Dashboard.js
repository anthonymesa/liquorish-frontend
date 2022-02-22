
import './Dashboard.css';
import React, { useEffect } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';
import { Row, Col, Stack } from 'react-bootstrap';

const BarHead = (props) => {
  return (
    <Row id="bar_head">
      <Row>
        <Col xs="1">
          <FiChevronLeft /> 
        </Col>
        <Col xs="auto">
          Home
        </Col>
      </Row>
      <Row id="bar_info">
        <Stack>
          <h2>{ props.bar.name }</h2>
          <p>{props.bar.name}</p>
          <p>{props.bar.description}</p>
        </Stack>
      </Row>
    </Row>
  )
}

const TabPay = () => {
  return (
    <div id="tab_pay"></div>
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
        <h2>{ drink_data.name }</h2>
      </Row>
    </div>
  });

  return (
    <div id="tab_list">
      { savedDrinks }
    </div>
  )
}

const AddItemToOrder = () => {
  return (
    <div id="add_item_to_order">
      <FiPlusCircle size={"4em"} />
    </div>
  )
}

const Dashboard = () => {

  const [user_id, setUserId] = React.useState("");
  const [bar, setBar] = React.useState("");
  const [tab_id, setTabId] = React.useState("");

  useEffect(() => {
    let client_id = JSON.parse(sessionStorage.getItem('client_id'));
    setUserId(client_id);

    let bar = JSON.parse(sessionStorage.getItem('bar'));
    setBar(bar);
    
    const url = 'http://liquorish-server.azurewebsites.net/tab/' + client_id + '/' + bar.id;

    fetch(url).then(response => {
      if(response.ok) {
        return response.json();
      }
    }).then(data => {
      setTabId(data.id);
      sessionStorage.setItem('user-dat', JSON.stringify(data));
    });

  }, []);

  return (
    <div className="root" id="dashboard_root">
      <Stack id="dashboard_contents">
        <BarHead bar={ bar }/>
        <TabPay tab_id={tab_id} user_id={user_id}/>
        <TabList tab_id={tab_id} user_id={user_id}/>
      </Stack>
      <AddItemToOrder />
    </div>
  )
}

export default Dashboard