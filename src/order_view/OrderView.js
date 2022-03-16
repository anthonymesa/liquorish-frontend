
import './OrderView.css';
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <div>
      <Link to="/dashboard">back</Link>
    </div>
  )
}

const DrinkInfo = () => {

  return (
    <div>
      DrinkInfo
    </div>
  )
}

const DrinkIngredients = () => {

  return (
    <div>
      DrinkIngredients
    </div>
  )
}

const OrderView = () => {

  return (
    <div>
      <Header />
      <DrinkInfo />
      <DrinkIngredients />
    </div>
  )
}

export default OrderView