//import './Settings.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import ValidateAuth from "../Auth";
import { useNavigate } from "react-router-dom";
//import {  Row, Stack, Button, Alert, Image  } from 'react-bootstrap';
import { Row, Stack } from "react-bootstrap";
//import '../../../liquorish-backend/routes/get/getSavedDrinks';
//import '../../../liquorish-backend/routes/get/updateUserCityState';
//import '../../../liquorish-backend/routes/get/updateUserPassword';

const OrderSavedDrinksHeader = () => {
  return (
    <Stack id="ordersaveddrinks_header">
      <Row id="row-header">
        <p>
          <a href="/">back</a>
        </p>
        <p>Order Saved Drinks</p>
      </Row>
    </Stack>
  );
};

const OrderSavedDrinksForm = (props) => {
  let navigate = useNavigate();

  const checkList = [
    "GlenLevit Whisky",
    "Captain Morgan Rum",
    "Greygoose Vodka",
  ];

  const [checked, setChecked] = React.useState([]);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="app">
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>{`Items checked are: ${checkedItems}`}</div>
    </div>
  );
};

const OrderSavedDrinks = (props) => {
  return (
    <div>
      <div id="barsetting_page">
        <div className="wrapper column">
          <OrderSavedDrinksHeader />
          <OrderSavedDrinksForm applicationState={props.applicationState} />
        </div>
      </div>
    </div>
  );
};

export default OrderSavedDrinks;
