
import './NewOrder.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import HeaderV2 from '../headerv2/HeaderV2';
import { Button, Row } from 'react-bootstrap';

const Header = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    console.log("NewOrder::Header.handleBack - Clicked!");

    navigate('/dashboard', { replace: true });
  }

  return (
    <div>
      <div onClick={handleBack}>
        Back
      </div>

      <h1>Ready to Order!</h1>
    </div>
  )
}

const NewOrderList = (props) => {

  const navigate = useNavigate();

  const [bar_drinks_dom, setBarDrinksDom] = React.useState([]);

  const getBarDrinksDom = (_bar_id) => {
    return new Promise(async (resolve, reject) => {

      const url = 'https://liquorish-server.azurewebsites.net/barDrinks/' + _bar_id;

      const response = await fetch(url)
      const jsonResponse = await response.json();

      const handleBarDrinkSelection = (_drink_data) => {
        sessionStorage.setItem('drink_data', JSON.stringify(_drink_data));
        navigate('/dashboard/neworder/addrto', { replace: true })
      }

      const bar_drinks_dom_generator = await jsonResponse.value.map((drink_data) =>
        <div key={JSON.stringify(drink_data)} className="bar_drink" onClick={() => { handleBarDrinkSelection(drink_data); }}>
          <div>
            <div className="new-order-name">
              <h2>
                {drink_data["drink_name"]}
              </h2>
            </div>
            <div className="new-order-price">
              <p>
                {drink_data["price"]} $
              </p>
            </div>
          </div>
        </div>
      );

      resolve(bar_drinks_dom_generator)
    });
  }

  useEffect(() => {
    getBarDrinksDom(props.bar_id).then((_bar_drinks_dom) => {
      setBarDrinksDom(_bar_drinks_dom);
    });
  }, []);

  return (
    <div>
      <Row className="g-0" id="drink_list">
        {bar_drinks_dom}
      </Row>
    </div>
  )
}

const NewOrderAction = () => {

  const navigate = useNavigate();

  const handleSavedDrinks = () => {
    console.log("NewOrder::NewOrderAction.handleSavedDrinks - Clicked!");
  }

  const handleMixYourOwn = () => {
    console.log("NewOrder::NewOrderAction.handleMixYourOwn - Clicked!");
  }

  return (
    <div className="liquorish-footer">
      <Button className="btn btn-primary" id="saved-drinks-btn" onClick={handleSavedDrinks}>Saved Drinks</Button>
      <Button className="btn btn-secondary" onClick={handleMixYourOwn}>Mix Your Own!</Button>
    </div>
  )
}

/**
 * NewOrder module for A6
 * @returns 
 */
const NewOrder = () => {

  const [bar_data, setBarData] = React.useState(null);
  const [user_id, setUserId] = React.useState(null);
  const [is_loaded, setIsLoaded] = React.useState(false);

  /**
   * This should handle rejection in the future if the JSON data is corrupt, etc.
   * @returns 
   */
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

  useEffect(() => {
    getBarData().then((_bar_data) => {
      getUserId().then((_user_id) => {
        setBarData(_bar_data);
        setUserId(_user_id);
        setIsLoaded(true);
      })
    });
  }, []);

  return (
    <div className="root">
      <HeaderV2
        does_nav={true}
        nav_name={"Dashboard"}
        nav_link={"/dashboard"}
        title={"Ready to Order!"}
      />
      {is_loaded &&
        <NewOrderList bar_id={bar_data["id"]} />
      }
      <NewOrderAction />
    </div>
  );
}

export default NewOrder;






