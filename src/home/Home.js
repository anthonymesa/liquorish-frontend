import './Home.css';

import React from 'react';
import { useNavigate } from "react-router-dom";

import { FiMenu } from 'react-icons/fi'

const Header = () => {
  return (
    <div>
      <div>hi (Username!)</div>
      <button>
        <div><FiMenu /></div>
      </button>
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
    <div>
      <button onClick={ () => { handleClickBar(data.name) }}>
        <h1>{ data.name }</h1>
        <p>{ data.address }</p>
      </button>
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
