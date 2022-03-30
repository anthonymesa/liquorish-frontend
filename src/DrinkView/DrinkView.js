
import './DrinkView.css'

import React, { useEffect } from 'react'
import { Row, Col, Button, Stack, Image } from 'react-bootstrap';

const DrinkInfo = (props) => {

  return (
    <div id="drink_info">
      <div id="drink_info_container">
        <Image src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=' width="150" />
        <h1>{props.drink.drink_name}</h1>
        <p>{props.drink.description}</p>
      </div>
    </div>
  );
}

const getDrinkIngredientsDom = (drink_id) => {
  return new Promise(async (resolve, reject) => {
    const url = 'https://liquorish-server.azurewebsites.net/ingredients/' + drink_id;

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

  useEffect(() => {

    console.log(props.drink)

    getDrinkIngredientsDom(props.drink["drink_id"]).then((drink_ingredient_dom) => {
      setDrinkIngredientsList(drink_ingredient_dom);
    })
  }, [])

  return (drink_ingredients_list &&
  <div>
    <div>
      <div id="ingredients_divider">
        Ingredients
      </div>
      <div>
        {drink_ingredients_list}
      </div>
    </div>
  </div>

  );
}

const DrinkView = ({ drink_data }) => {

  useEffect(() => {
    console.log(drink_data)
  })

  return (drink_data && 
    <div>
      <DrinkInfo drink={drink_data} />
      <DrinkIngredients drink={drink_data} />
    </div>
  );
}

export default DrinkView