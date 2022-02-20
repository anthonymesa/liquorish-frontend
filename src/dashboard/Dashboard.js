
import './Dashboard.css';
import React, { useEffect } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';

const BarHead = (props) => {
  console.log(props.name)
  return (
    <div id="bar_head">
      <FiChevronLeft /> Home
      <div> 
        <h2>{ props.name }</h2>
      </div>
    </div>
  )
}

const TabPay = () => {
  return (
    <div id="tab_pay"></div>
  )
}

const TabList = () => {
  return (
    <div id="tab_list"></div>
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
    <div className="root" id="dashboard">
      <BarHead bar={ bar }/>
      <TabPay tab_id={tab_id} user_id={user_id}/>
      <TabList tab_id={tab_id} user_id={user_id}/>
      <AddItemToOrder />
    </div>
  )
}

export default Dashboard