
import './NewOrder.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Header = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    console.log("NewOrder::Header.handleBack - Clicked!");

    // navigate('./dashboard', { replace: true });
  }

  return (
    <div>
      <div onClick={ handleBack }>
        Back
      </div>
      
      <h1>Ready to Order!</h1>
    </div>
  )
}

const NewOrderList = () => {

  const [bar_drinks, setBarDrinks] = React.useState([]);

  const getBarDrinks = () => {
    return new Promise((resolve, reject) => {

      const sql_query = `
      select 
        drink_data.drink_id,
        drink_data.drink_name,
        drink_data.description,
        bar_drinks.price
        from bar_drinks inner join (
          select * 
          from drink 
          where drink.drink_id in (
            select bar_drinks.drink_id 
            from bar_drinks 
            where bar_id = 2
          )
        ) as drink_data
        on bar_drinks.drink_id = drink_data.drink_id
      `

    });
  }

  useEffect(() => {
    getBarDrinks().then((_bar_drinks) => {
      setBarDrinks(_bar_drinks);
    });
  }, []);

  return (
    <div>
      NewOrderList
    </div>
  )
}

const NewOrderAction = () => {

  const handleSavedDrinks = () => {
    console.log("NewOrder::NewOrderAction.handleSavedDrinks - Clicked!");
  }

  const handleMixYourOwn = () => {
    console.log("NewOrder::NewOrderAction.handleMixYourOwn - Clicked!");
  }

  return (
    <div>
      <button onClick={ handleSavedDrinks }>Saved Drinks</button>
      <button onClick={ handleMixYourOwn }>Mix Your Own!</button>
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

  /**
   * This should handle rejection in the future if the JSON data is corrupt, etc.
   * @returns 
   */
  const getBarData = () => {
    return new Promise((resolve, reject) => {
      const session_bar_data = JSON.parse(sessionStorage.getItem('bar'));
      console.log("NewOrder.getBarData() - Session bar data: " + JSON.stringify(session_bar_data));
      resolve(session_bar_data);
    })
  }

  const getUserId = () => {
    return new Promise((resolve, reject) => {
      const session_user_id = JSON.parse(sessionStorage.getItem('client_id'));
      console.log("NewOrder.getUserId() - Session user id: " + session_user_id);
      resolve(session_user_id);
    });
  }

  useEffect(() => {
    getBarData().then((_bar_data) => {
      setBarData(_bar_data);
    });

    getUserId().then((_user_id) => {
      setUserId(_user_id);
    })
  }, []);

  return (
    <div>
      <Header />
      <NewOrderList />
      <NewOrderAction />
    </div>
  );
}

export default NewOrder;






