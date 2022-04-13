
import './AddRto.css'
import React, { useEffect } from 'react'
import HeaderV2 from '../headerv2/HeaderV2'
import DrinkView from '../DrinkView/DrinkView'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'

const AddRtoFooter = ({ drink_data, tab_id }) => {

    const navigate = useNavigate();

    const updateOrderToTab = async () => {
        
        const url = "https://liquorish-server.azurewebsites.net/updateTab"

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

        return new Promise(async (resolve, reject) => {
            const response = await fetch(url, post_args);
            const jsonResponse = await response.json();
            resolve(jsonResponse.value)
        });
    }

    const handle_order = () => {
        updateOrderToTab().then((response) => {
            sessionStorage.removeItem('drink_data')
            navigate('/dashboard', {});
        });
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
    const [user_id, setUserId] = React.useState(null)

    useEffect(() => {
        const session_drink_data = JSON.parse(sessionStorage.getItem('drink_data'));
        const session_tab_data = JSON.parse(sessionStorage.getItem('tab_id'));
        const session_user_id = JSON.parse(sessionStorage.getItem('client_id'))
        
        setDrinkData(session_drink_data)
        setTabId(session_tab_data)
        setUserId(session_user_id)

    }, []);

    return (
        <div className="root">
            {drink_data && tab_id && user_id &&
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
                    <DrinkView drink_data={drink_data} user_id={user_id} />
                    <AddRtoFooter drink_data={drink_data} tab_id={tab_id}/>
                </div>
            }
        </div>
    )
}

export default AddRto