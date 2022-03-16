
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
  return new Promise(async (resolve, reject) => {
    const url = 'http://liquorish-server.azurewebsites.net/ingredients/' + drink_id;

    console.log(url)

    const response = await fetch(url);
    const jsonResponse = await response.json();

    const drink_ingredients_list = jsonResponse.value;

    const drink_ingredients_dom = drink_ingredients_list.map((drink_ingredient) => 
      <div key={ drink_ingredient.ingredient_id }>
        { drink_ingredient.name }
      </div>
    );

    resolve(drink_ingredients_dom)
  });
}

const DrinkIngredients = (props) => {

  const [drink_ingredients_list, setDrinkIngredientsList] = React.useState([])

  useEffect(async () => {
    await getDrinkIngredientsDom(props.drink["drink_id"]).then((drink_ingredient_dom) => {
      setDrinkIngredientsList(drink_ingredient_dom);
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

  const [drink, setDrink] = React.useState({});

  /**
   * This state allows us to control the page loading so that the drinkIngredients
   * are only populated after the initial useEffect is finished.
   */
  const [loaded, setIsLoaded] = React.useState(false);

  /**
   * useEffect, runs only on component's first mount
   */
  useEffect(() => {
    const drink_data = JSON.parse(sessionStorage.getItem('drink'));

    if(drink_data){
      setDrink(drink_data)
    }

    /**
     * now that the data has loaded, set the state to true, this will trigger the
     * page to reload, and DrinkIngredients to display.
     */
    setIsLoaded(true)
  }, [])

  return (
    <div>
      <Header drink_price={ drink["price"] }/>
      <DrinkInfo drink={ drink }/>
      { loaded &&
        <DrinkIngredients drink={drink}/>
      }
    </div>
  );
}

export default OrderView