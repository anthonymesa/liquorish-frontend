
import './Dashboard.css';
import React, { useEffect } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { Row, Button, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import HeaderV2 from '../headerv2/HeaderV2';

//==============================================================================
//  Module - Dashboard
//==============================================================================

export default function Dashboard(){

  const [user_id, setUserId] = React.useState("");
  const [bar, setBar] = React.useState("");

  /**
   * The tab id is being maintained here at the Dashboard level so that this
   * call only needs to be made once and can be saved to the session storage.
   */
  const [tab_id, setTabId] = React.useState("");
  const [loaded, setIsLoaded] = React.useState(false);

  const getBarData = () => {
    return new Promise((resolve, reject) => {
      const session_bar_data = JSON.parse(sessionStorage.getItem('bar'));
      resolve(session_bar_data);
    })
  }

  const getUserId = () => {
    return new Promise((resolve, reject) => {
      const session_user_id = JSON.parse(sessionStorage.getItem('client_id'));
      resolve(session_user_id);
    });
  }

  useEffect(() => {
    getBarData().then((_bar_data) => {
      getUserId().then((_user_id) => {
        setBar(_bar_data);
        setUserId(_user_id);
        setIsLoaded(true);
      })
    });
  }, []);

  return (
    <div className="root">
      
      <HeaderV2
        does_nav={true}
        nav_name={"Home"}
        nav_link={'/home/user'}
        unstore={["bar"]}
        title={"Dashboard"}
      />
      
      <BarHead bar={bar} />
      <TabPay tab_id={tab_id} user_id={user_id} />

      {loaded &&
        <TabList bar_id={bar["id"]} user_id={user_id} />
      }

      <AddItemToOrder />

    </div>
  )
}

//==============================================================================
//  Module - BarHead
//==============================================================================

function BarHead({bar}){

  return (
    <Row className="g-0" id="bar_head">
      <div id="bar_info">
        <div id="bar_info_container">
          <Image src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=' width="150" />
          <h1>{bar["bar_name"]}</h1>
          <p>{bar["address_street"]}, {bar["address_city"]}, {bar["address_state"]}, {bar["address_zip"]}</p>
        </div>
      </div>
    </Row>
  )
}

//==============================================================================
//  Module - TabPay
//==============================================================================

function TabPay(){

  const handleTabPay = () => {
    console.log("paying for tab...")
  }

  return (
    <Row className="g-0" id="tab_pay">
      <Button id="tab_pay_button" variant="primary" onClick={handleTabPay}>Pay for tab</Button>
    </Row>
  )
}

//==============================================================================
//  Module - TabList
//==============================================================================

function TabList(props){
  const navigate = useNavigate();

  const [bar_drinks_dom, setBarDrinksDom] = React.useState(null)

  const handleOrderView = async (drink_data) => {
    await sessionStorage.setItem('drink', JSON.stringify(drink_data));
    navigate("/dashboard/orderview", { replace: true });
  }

  const generateTabDrinksDom = async () => {

    const test_promise = () => {
      return new Promise((resolve, reject) => {

        getTabDrinks(props.bar_id, props.user_id).then((tab_drinks) => {
          resolve(tab_drinks)
        })
      })
    }

    const tab_drinks = await test_promise()

    const tab_drinks_dom = await tab_drinks.map((drink_data) =>
      <div key={drink_data["drink_name"]} className="tab_drink" onClick={() => { handleOrderView(drink_data) }}>
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
      {bar_drinks_dom}
    </Row>
  )
}

//==============================================================================
//  Module - AddItemToOrder
//==============================================================================

/**
 * This module is always floating at the bottom right corner of the dashboard.
 * When a user clicks on this element, they intend to create a new order.
 */
function AddItemToOrder(){

  const navigate = useNavigate();

  const handleAddItemToOrder = () => {
    navigate("/dashboard/neworder", { replace: true });
  }

  return (
    <div id="add_item_to_order" onClick={handleAddItemToOrder}>
      <FiPlusCircle size={"4em"} />
    </div>
  )
}

//==============================================================================
//  Functions
//==============================================================================

const getTabDrinks = (bar_id, user_id) => {
  return new Promise(async (resolve, reject) => {
    const client_id = sessionStorage.getItem('client_id');

    const url = 'https://liquorish-server.azurewebsites.net/tabDrinks/' + user_id + '/' + bar_id;

    const response = await fetch(url)
    const jsonResponse = await response.json();

    resolve(jsonResponse.value)
  });
}





