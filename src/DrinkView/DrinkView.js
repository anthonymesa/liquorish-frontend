
import './DrinkView.css'

import React, { useEffect } from 'react'
import { Row, Col, Button, Stack, Image } from 'react-bootstrap';
import AddFavorite from '../add_favorite/AddFavorite';

const DrinkInfo = (props) => {

    return (
        <div id="drink_info">
            <div id="drink_info_container">
                <Image id="drink-image" src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=' width="150" />
                <h1>{props.drink.drink_name}</h1>
                <p>{props.drink.description}</p>
            </div>
        </div>
    );
}

const DrinkIngredients = (props) => {

    const [drink_ingredients_list, setDrinkIngredientsList] = React.useState([])

    const getIngredients = () => {
        return new Promise(async (resolve, reject) => {

            const url = 'https://liquorish-server.azurewebsites.net/ingredients/' + drink_id;
            const response = await fetch(url);
            const jsonResponse = await response.json();
            resolve(jsonResponse.value)
        }
    }

    const generateIngredientsList = (_ingredients) => {
        const ingredient_list_dom = generateIngredientsListDom(_ingredients)
        setDrinkIngredientsList(ingredient_list_dom)
    }

    const generateIngredientsListDom = (_ingredients) => {
        return _ingredients.map((ingredient) => <IngredientElement ingredient={ingredient} />)
    }

    useEffect(() => {
        getIngredients().then(generateIngredientsList)
    }, [])

    return (drink_ingredients_list &&
        <Row className="g-0" id="ingredients-list">
            {drink_ingredients_list}
        </Row>
    );
}

const DrinkView = ({ drink_data, user_id }) => {
    console.log(user_id)
    return (drink_data && user_id &&
        <div>
            <AddFavorite className="add-drink-favorite" user_id={user_id} drink_id={drink_data.drink_id} />

            <DrinkInfo drink={drink_data} />

            <div id="ingredients_divider">
                Ingredients
            </div>

            <DrinkIngredients drink={drink_data} />
        </div>
    );
}

function TabListElement({ drink_data }) {

    const navigate = useNavigate();

    const handleOrderView = async (drink_data) => {
        await sessionStorage.setItem('drink', JSON.stringify(drink_data));
        navigate("/dashboard/orderview", { replace: true });
    }

    return (
        <div key={drink_ingredient.ingredient_id} className="drink_ingredient">
            <Row className="g-0">
                <h2>{drink_ingredient.name}</h2>
            </Row>
        </div>
    )
}

export default DrinkView