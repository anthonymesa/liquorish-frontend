
import './OrderView.css';
import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Stack, Image } from 'react-bootstrap';
import { FiChevronLeft } from 'react-icons/fi';

const Header = (props) => {

  const navigate = useNavigate()

  const handleDashboard = () => {
    sessionStorage.removeItem('drink')
    navigate("/dashboard", { replace: true });
  }

  return (
    <Row className="g-0 header">
      <Stack>
        <div id="dashboard_nav" onClick={() => { handleDashboard() }}>
          <FiChevronLeft /> Dashboard
        </div>
        <div>
          {props.drink_price}
        </div>
      </Stack>
    </Row>
  )
}

const DrinkInfo = (props) => {

  return (
    <div id="drink_info">
      <div id="drink_info_container">
        <Image src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=' width="150"/>
        <h1>{props.drink.drink_name}</h1>
        <p>{props.drink.description}</p>
      </div>
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
      <div key={drink_ingredient.ingredient_id} className="drink_ingredient">
        <Row className="g-0">
          <h2>{drink_ingredient.name}</h2>
        </Row>
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
      <div id="ingredients_divider">
        Ingredients
      </div>
      <div>
        {drink_ingredients_list}
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

    if (drink_data) {
      setDrink(drink_data)
    }

    /**
     * now that the data has loaded, set the state to true, this will trigger the
     * page to reload, and DrinkIngredients to display.
     */
    setIsLoaded(true)
  }, [])

  return (
    <div className="root">
      <Header drink_price={drink["price"]} />
      <DrinkInfo drink={drink} />
      {loaded &&
        <DrinkIngredients drink={drink} />
      }
    </div>
  );
}

export default OrderView