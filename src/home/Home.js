import './Home.css';

import React from 'react';
import { useNavigate } from "react-router-dom";

import { FiMenu } from 'react-icons/fi'

const Header = () => {
  let username = "unknown";
  
  return (
    <div className="header">
      <div id="greeting">
        <p>Welcome { username }</p>
      </div>
      <div id="settings_button">
        <div><FiMenu size="2em" onClick={ () => { console.log("go to settings...")} }/></div>
      </div>
    </div>
  )
}

const getBarsNearMe = () => {
  return [
    {
      name: "The Winking Skeever",
      address: "test address 1"
    },
    {
      name: "Hillbilly Hollar",
      address: "test address 2"
    },
    {
      name: "The other One",
      address: "test address 3"
    }
  ]
}

const Home = (props) => {
  let navigate = useNavigate();

  const bars_near_me = getBarsNearMe();

  const handleClickBar = (bar_name) => {
    console.log(bar_name);
    navigate("../dashboard", { replace: true });
  }

  const barListItems = bars_near_me.map((data) =>
    <div className="bar_list_item" onClick={ () => { handleClickBar(data.name) }}>
      <h2>{ data.name }</h2>
      <p>{ data.address }</p>
    </div>
  );

  return (
    <div>
      <Header />
      { barListItems }
    </div>
  )
}

//  Eport the function to be called elsewhere
export default Home;
