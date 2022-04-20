
import './Dashboard.css';
import React, { useEffect } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { Row, Button, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import HeaderV2 from '../headerv2/HeaderV2';
import PollingLayer from '../polling_layer/PollingLayer';
import ReadyStateIcon from '../ReadyStateIcon/ReadyStateIcon';

//==============================================================================
//  Module - Dashboard
//==============================================================================

export default function Dashboard() {

    const [user_id, setUserId] = React.useState("");
    const [bar, setBar] = React.useState("");

    /**
     * The tab id is being maintained here at the Dashboard level so that this
     * call only needs to be made once and can be saved to the session storage.
     */
    const [tab_id, setTabId] = React.useState("");
    const [loaded, setIsLoaded] = React.useState(false);

    const getBarData = () => {
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

    const getTabId = (_user_id, _bar_id) => {
        return new Promise(async (resolve, reject) => {
            const url = 'https://liquorish-server.azurewebsites.net/getTabID/' + _user_id + '/' + _bar_id
            const response = await fetch(url);
            const jsonResponse = await response.json();
            console.log(jsonResponse.value)
            resolve(jsonResponse.value)
        });
    }

    useEffect(() => {
        console.log('testing!')

        getBarData().then((_bar_data) => {
            getUserId().then((_user_id) => {
                getTabId(_user_id, _bar_data.id).then((_tab_id) => {

                    try{
                        // set tab_id
                        if(_tab_id.tab_id){
                            sessionStorage.setItem('tab_id', JSON.stringify(_tab_id.tab_id))
                            setTabId(_tab_id.tab_id);
                        }
                    } catch (error) {
                        console.log(error)
                    }

                    // set bar and user_id
                    setBar(_bar_data);
                    setUserId(_user_id);
                    
                    setIsLoaded(true);
                })
            })
        });
    }, []);

    return (
        <div className="root">

            <HeaderV2
                does_nav={true}
                nav_name={"Home"}
                nav_link={'/home/user'}
                unstore={["bar", "tab_id"]}
                title={"Dashboard"}
            />

            <BarHead bar={bar} />
            <TabPay tab_id={tab_id} user_id={user_id} />

            {loaded &&
                <TabList bar_id={bar["id"]} user_id={user_id} />
            }

            <AddItemToOrder />

        </div>
    )
}

//==============================================================================
//  Module - BarHead
//==============================================================================

function BarHead({ bar }) {

    return (
        <Row className="g-0" id="bar_head">
            <div id="bar_info">
                <div id="bar_info_container">
                    <Image id="bar-image" src='https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=' width="150" />
                    <h1>{bar["bar_name"]}</h1>
                    <p>{bar["address_street"]}, {bar["address_city"]}, {bar["address_state"]}, {bar["address_zip"]}</p>
                </div>
            </div>
        </Row>
    )
}

//==============================================================================
//  Module - TabPay
//==============================================================================

function TabPay() {

    const handleTabPay = () => {
        console.log("paying for tab...")
    }

    return (
        <Row className="g-0" id="tab_pay">
            <Button id="tab_pay_button" variant="primary" onClick={handleTabPay}>Pay for tab</Button>
        </Row>
    )
}

//==============================================================================
//  Module - TabList
//==============================================================================

function TabList({ bar_id, user_id }) {

    const [bar_drinks_dom, setBarDrinksDom] = React.useState(null)

    useEffect(async () => {
        initializeTabDrinks()
    }, [])

    const initializeTabDrinks = () => getTabDrinks(bar_id, user_id).then(generateTabList)

    const generateTabList = (_tab_drinks) => {
        const tab_list_dom = generateTabListDom(_tab_drinks)
        setBarDrinksDom(tab_list_dom)
    }

    const generateTabListDom = (_tab_drinks) => {
        return _tab_drinks.map((drink_data) => <TabListElement drink_data={drink_data} />)
    }

    const getTabDrinks = (bar_id, user_id) => {
        return new Promise(async (resolve, reject) => {
            const url = 'https://liquorish-server.azurewebsites.net/tabDrinks/' + user_id + '/' + bar_id;
            const response = await fetch(url)
            const jsonResponse = await response.json();
            resolve(jsonResponse.value)
        });
    }

    const updateTabList = () => {
        initializeTabDrinks()
    }

    return (
        <div>
            <Row className="g-0" id="tab_list">
                {bar_drinks_dom}
            </Row>

            <PollingLayer polling_time={1000} timeout_ref={'tab_list_poll'} action={updateTabList} />
        </div>
    )
}

//==============================================================================
//  Module - AddItemToOrder
//==============================================================================

/**
 * This module is always floating at the bottom right corner of the dashboard.
 * When a user clicks on this element, they intend to create a new order.
 */
function AddItemToOrder() {

    const navigate = useNavigate();

    const handleAddItemToOrder = () => {
        navigate("/dashboard/neworder", { replace: true });
    }

    return (
        <div id="add_item_to_order" onClick={handleAddItemToOrder}>
            <FiPlusCircle size={"4em"} />
        </div>
    )
}

//==============================================================================
//  Module - TabListElement
//==============================================================================

/**
 *  This module defines a single element of the tab list.
 */
function TabListElement({ drink_data }) {

    const navigate = useNavigate();

    const handleOrderView = async (drink_data) => {
        await sessionStorage.setItem('drink', JSON.stringify(drink_data));
        navigate("/dashboard/orderview", { replace: true });
    }

    return (
        <div key={drink_data["drink_name"]} className="tab_drink" onClick={() => { handleOrderView(drink_data) }}>
            <Row >
                <h2>{drink_data["drink_name"]}</h2>
            </Row>
            <div className="element_ready_icon">
                <ReadyStateIcon ready_state={drink_data.ready_status}/>
            </div>
        </div>
    )
}

function makeGetRequest(url) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url);
        const jsonResponse = await response.json();
        resolve(jsonResponse.value)
    });
}

