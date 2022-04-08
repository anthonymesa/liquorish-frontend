
import './OrderView.css';
import React, { useEffect } from 'react'
import HeaderV2 from '../headerv2/HeaderV2';
import DrinkView from '../DrinkView/DrinkView';

const OrderView = () => {

  const [drink, setDrink] = React.useState(null);
  const [user_id, setUserId] = React.useState(null)

  /**
   * sessionStorage doesn't require this be a Promise but we could need promise
   * functionality down the road.
   * @returns 
   */
  const getDrinkData = () => {
    return new Promise((resolve, reject) => {
      const drink_data = JSON.parse(sessionStorage.getItem('drink'));
      resolve(drink_data);
    });
  }

  /**
   * useEffect, runs only on component's first mount
   */
  useEffect(() => {
    getDrinkData().then((_drink_data) => {
      setDrink(_drink_data);
      const session_user_id = JSON.parse(sessionStorage.getItem('client_id'));
      setUserId(session_user_id)
    });
  }, [])

  /**
   * If drink is not null (has been set) then render the contents of the page.
   */
  return (
    <div className="root">
      {drink &&
        <div>
          <HeaderV2
            does_nav={true}
            nav_name={"Dashboard"}
            nav_link={"/dashboard"}
            unstore={['drink']}
          />

          <DrinkView drink_data={drink} user_id={user_id} />
        </div>
      }
    </div>
  );
}

export default OrderView