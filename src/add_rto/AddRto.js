
import './AddRto.css'
import React, { useEffect } from 'react'
import HeaderV2 from '../headerv2/HeaderV2'
import DrinkView from '../DrinkView/DrinkView'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'

const AddRtoFooter = ({ drink_data, tab_id }) => {

    const navigate = useNavigate();

    const updateOrderToTab = () => {
        const post_args = {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                tab_id: tab_id,
                bar_drink_id: drink_data.bar_drink_id
            })
        }

        fetch("https://liquorish-server.azurewebsites.net/updateTab", post_args).then((response) => {
            console.log(response.json)
        });
    }

    const handle_order = () => {
        // updateOrderToTab()
        console.log(drink_data)

        // addOrder(tab_id, drink_data.bar_drink_id)
        // sessionStorage.removeItem('drink_data')
        // navigate('/dashboard', {});
    }

    return (
        <div className="liquorish-footer">
            <Button className="btn btn-primary" id="order-btn" onClick={handle_order}>Order!</Button>
        </div>
    )
}

const DrinkPrice = ({ drink_price }) => {
    return (
        <div className="addrto-drink-price">
            {drink_price} $
        </div>
    )
}

const AddRto = () => {

    const [drink_data, setDrinkData] = React.useState(null);
    const [tab_id, setTabId] = React.useState(null);

    const getDrinkData = () => {
        return new Promise((resolve, reject) => {
            const session_drink_data = JSON.parse(sessionStorage.getItem('drink_data'));
            resolve(session_drink_data);
        });
    }

    const getTabId = () => {
        return new Promise((resolve, reject) => {
            const session_drink_data = JSON.parse(sessionStorage.getItem('tab_id'));
            resolve(session_drink_data);
        });
    }

    useEffect(() => {
        getDrinkData().then((_drink_data) => {
            getTabId().then((_tab_id) => {
                setDrinkData(_drink_data)
                setTabId(tab_id)
            })
        })

    }, []);

    return (
        <div className="root">
            {drink_data && tab_id && 
                <div>
                    <HeaderV2
                        does_nav={true}
                        nav_name={"New Order"}
                        nav_link={"/dashboard/neworder"}
                        title={"Drinks Ready To Order!"}
                        elements={[
                            <DrinkPrice drink_price={drink_data["price"]} />,
                        ]}
                        unstore={['drink_data']}
                    />
                    <DrinkView drink_data={drink_data} />
                    <AddRtoFooter drink_data={drink_data} tab_id={tab_id}/>
                </div>
            }
        </div>
    )
}

export default AddRto