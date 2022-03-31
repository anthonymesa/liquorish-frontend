
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Stack } from "react-bootstrap";
import HeaderV2 from "../headerv2/HeaderV2";
import './OrderSaved.css'

export default function OrderSavedDrinks() {

    const [user_id, setUserId] = React.useState("");
    const [bar, setBar] = React.useState("");
    const [is_loaded, setIsLoaded] = React.useState(false);

    const getBar = () => {
        return new Promise((resolve, reject) => {
            const session_bar_data = JSON.parse(sessionStorage.getItem('bar'));
            resolve(session_bar_data);
        })
    }

    const getUserId = () => {
        return new Promise((resolve, reject) => {
            const session_user_id = JSON.parse(sessionStorage.getItem('client_id'));
            resolve(session_user_id);
        });
    }

    useEffect(() => {
        getBar().then((_bar_data) => {
            getUserId().then((_user_id) => {
                setBar(_bar_data);
                setUserId(_user_id);
                setIsLoaded(true);
            })
        })
    }, []);
    
    return (
        <div className="root">
            <HeaderV2
                does_nav={true}
                nav_link={"/dashboard/neworder"}
                title={"Add Saved Drink to Order"}
            />

            {is_loaded &&
            <SavedBarDrinksList user_id={user_id} bar_id={bar.id} />
}
        </div>
    )
}

const SavedBarDrinksList = ({ user_id, bar_id }) => {

    const [saved_bar_drinks_dom, setSavedBarDrinksDom] = React.useState(null)

    const getSavedBarDrinks = (user_id, bar_id) => {
        return new Promise(async (resolve, reject) => {
            const url = 'https://liquorish-server.azurewebsites.net/savedBarList/' + user_id + '/' + bar_id;
            const response = await fetch(url)
            const jsonResponse = await response.json();
            resolve(jsonResponse.value)
        })
    }

    const generateSavedBarDrinksDom = (saved_bar_drinks) => {
        return saved_bar_drinks.map((saved_bar_drink) => <SavedBarDrinksElement saved_bar_drink={saved_bar_drink} />)
    }

    const generateSavedBarDrinksList = (saved_bar_drinks) => {
        const saved_bar_drinks_dom = generateSavedBarDrinksDom(saved_bar_drinks)
        setSavedBarDrinksDom(saved_bar_drinks_dom)
    }

    const initializeDrinksList = () => getSavedBarDrinks(user_id, bar_id).then(generateSavedBarDrinksList)

    useEffect(() => {
        initializeDrinksList()
    }, [])

    return (
        <Row className="g-0" id="saved_bar_drinks_list">
            {saved_bar_drinks_dom}
        </Row>
    )
}

function SavedBarDrinksElement({ saved_bar_drink }) {

    const navigate = useNavigate();

    const handleSavedBarDrinkClick = (drink_data) => {
        sessionStorage.setItem('drink_data', JSON.stringify(saved_bar_drink))
        navigate("/dashboard/neworder/ordersaved/addsaved", { replace: true });
    }

    return (
        <div key={saved_bar_drink["drink_name"]} className="tab_drink" onClick={() => { handleSavedBarDrinkClick(saved_bar_drink) }}>
            <Row >
                <h2>{saved_bar_drink["drink_name"]}</h2>
            </Row>
        </div>
    )
}


