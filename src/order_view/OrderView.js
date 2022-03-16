
import './OrderView.css';
import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Header = (props) => {

  const navigate = useNavigate()

  const clearDrink = () => {
    sessionStorage.removeItem('drink')
    navigate("/dashboard", { replace: true });
  }

  const drink_price = props.drink_price

  return (
    <div>
      <div onClick={ clearDrink }>
        [back]
      </div>

      <div>
        { drink_price }
      </div>
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

const getDrink = new Promise((resolve, reject) => {
  const drink = sessionStorage.getItem('drink')

  if(drink)
  {
    resolve(drink)
  } else {
    reject(drink)
  }
})

const OrderView = () => {

  const [drink, setDrink] = React.useState({})

  useEffect(() => {
    getDrink.then((drink_data) => {
      setDrink(drink_data)
    })
  }, [])

  return (
    <div>
      <Header drink_price={ drink["price"] }/>
      <DrinkInfo />
      <DrinkIngredients />
    </div>
  )
}

export default OrderView