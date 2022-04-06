
import './AddRto.css'
import React, { useEffect } from 'react'
import HeaderV2 from '../headerv2/HeaderV2'
import DrinkView from '../DrinkView/DrinkView'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'

const AddRtoFooter = () => {

  const navigate = useNavigate();

  const handle_order = () => {
    console.log('handleing!');
    sessionStorage.removeItem('drink_data')
    navigate('/dashboard', {});
  }

  return (
    <div className="liquorish-footer">
      <Button className="btn btn-primary" id="order-btn" onClick={handle_order}>Order!</Button>
    </div>
  )
}

const DrinkPrice = ({drink_price}) => {
  return ( 
      <div className="addrto-drink-price">
        {drink_price} $
      </div>
  )
}

const AddRto = () => {

  const [drink_data, setDrinkData] = React.useState(null)
    const [user_id, setUserId] = React.useState(null)

  const getDrinkData = () => {
    return new Promise((resolve, reject) => {
      const session_drink_data = JSON.parse(sessionStorage.getItem('drink_data'));
      resolve(session_drink_data);
    });
  }

  useEffect(() => {
    getDrinkData().then((_drink_data) => {
      setDrinkData(_drink_data);

      const session_user_id = JSON.parse(sessionStorage.getItem('client_id'));
        setUserId(session_user_id)
        
    })

  }, []);

  return (
    <div className="root">
      {(drink_data && user_id) && 
        <div>
          <HeaderV2
            does_nav={true}
            nav_name={"New Order"}
            nav_link={"/dashboard/neworder"}
            title={"Drinks Ready To Order!"}
            elements={[
              <DrinkPrice drink_price={drink_data["price"]}/>,
            ]}
            unstore={['drink_data']}
          />
          <DrinkView user_id={user_id} drink_data={drink_data}/>
          <AddRtoFooter />
        </div>
      }
    </div>
  )
}

export default AddRto