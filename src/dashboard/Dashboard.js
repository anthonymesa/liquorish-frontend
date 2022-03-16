
import './Dashboard.css';
import React, { useEffect } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';
import { Row, Col, Button, Stack, Image } from 'react-bootstrap';
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
            <Image src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=' width="150"/>
            <h1>{props.bar["bar_name"]}</h1>
            <p>{props.bar["address_street"]}, {props.bar["address_city"]}, {props.bar["address_state"]}, {props.bar["address_zip"]}</p>
          </div>
        </div>
      </Stack>
    </Row>
  )
}

const TabPay = () => {

  const handleTabPay = () => {
    console.log("paying for tab...")
  }

  return (
    <Row className="g-0" id="tab_pay">
      <Button id="tab_pay_button" variant="primary" onClick={handleTabPay}>Pay for tab</Button>
    </Row>
  )
}

const getTabDrinks = (bar_id, user_id) => {
  return new Promise(async (resolve, reject) => {
    const client_id = sessionStorage.getItem('client_id');

    const url = 'http://liquorish-server.azurewebsites.net/tabDrinks/' + user_id + '/' + bar_id;

    const response = await fetch(url)
    const jsonResponse = await response.json();

    resolve(jsonResponse.value)
  });
}

const TabList = (props) => {
  const navigate = useNavigate();

  const [bar_drinks_dom, setBarDrinksDom] = React.useState(null)

  const handleOrderView = (drink_data) => {
    sessionStorage.setItem('drink', JSON.stringify(drink_data));
    navigate("/home/user/orderview", { replace: true });
  }

  const generateTabDrinksDom = async () => {

    const test_promise = () => {
      return new Promise((resolve, reject) => {

        console.log(props.bar_id, props.user_id)

        getTabDrinks(props.bar_id, props.user_id).then((tab_drinks) => {
          resolve(tab_drinks)
        })
      })
    }

    const tab_drinks = await test_promise()

    const tab_drinks_dom = await tab_drinks.map((drink_data) =>
      <div key={drink_data["drink_name"]} className="tab_drink" onClick={ () => { handleOrderView(drink_data) }}>
        <Row >
          <h2>{drink_data["drink_name"]}</h2>
        </Row>
      </div>
    );

    setBarDrinksDom(tab_drinks_dom)
  }

  useEffect(async () => {
    await generateTabDrinksDom()
  }, [])
  
  return (
    <Row className="g-0" id="tab_list">
      { bar_drinks_dom }
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

const Dashboard = () => {

  const [user_id, setUserId] = React.useState("");
  const [bar, setBar] = React.useState("");

  /**
   * The tab id is being maintained here at the Dashboard level so that this
   * call only needs to be made once and can be saved to the session storage.
   */
  const [tab_id, setTabId] = React.useState("");
  const [loaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    let client_id = JSON.parse(sessionStorage.getItem('client_id'));
    setUserId(client_id);

    let bar = JSON.parse(sessionStorage.getItem('bar'));
    setBar(bar);

    setIsLoaded(true)
  }, [])

  return (
    <div className="root" id="dashboard_root">
      <Stack id="dashboard_contents">
        <BarHead bar={bar} />
        <TabPay tab_id={tab_id} user_id={user_id} />
        
        { loaded &&
          <TabList bar_id={bar["id"]} user_id={user_id} /> 
        }

      </Stack>
      <AddItemToOrder />
    </div>
  )
}

export default Dashboard