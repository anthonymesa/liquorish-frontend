
import './OrderView.css';
import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Header = (props) => {

  const navigate = useNavigate()

  const clearDrink = () => {
    sessionStorage.removeItem('drink')
    navigate("/dashboard", { replace: true });
  }

  return (
    <div>
      <div onClick={ clearDrink }>
        [back]
      </div>

      <div>
        { props.drink_price }
      </div>
    </div>
  )
}

const DrinkInfo = (props) => {

  return (
    <div>
      { props.drink.drink_name }
      { props.drink.description }
    </div>
  );
}

const getDrinkIngredientsDom = (drink_id) => {
  return new Promise((resolve, reject) => {
    // const url = 'http://liquorish-server.azurewebsites.net/tabDrinks/' + user_id + '/' + bar_id;

    // const response = await fetch(url)
    // const jsonResponse = await response.json();

    // resolve(jsonResponse.value)

    const drink_ingredients_list = ['an ingredient'];

    const drink_ingredients_dom = drink_ingredients_list.map((drink_ingredient) => 
      <div>
        { drink_ingredient }
      </div>
    );

    resolve(drink_ingredients_dom)
  });
}

const DrinkIngredients = (props) => {

  const [drink_ingredients_list, setDrinkIngredientsList] = React.useState([])

  useEffect(() => {
    getDrinkIngredientsDom(props.drink_id).then((drink_ingredient_dom) => {
      setDrinkIngredientsList(drink_ingredient_dom)
    })
  }, [])

  return (
    <div>
      <div>
        Ingredients
      </div>
      <div>
        { drink_ingredients_list }
      </div>
    </div>
  );
}

const OrderView = () => {

  const [drink, setDrink] = React.useState({})

  useEffect(() => {
    const drink_data = JSON.parse(sessionStorage.getItem('drink'));

    if(drink_data){
      setDrink(drink_data)
    }
  }, [])

  return (
    <div>
      <Header drink_price={ drink["price"] }/>
      <DrinkInfo drink={ drink }/>
      <DrinkIngredients drink_id={drink["drink_id"]}/>
    </div>
  );
}

export default OrderView