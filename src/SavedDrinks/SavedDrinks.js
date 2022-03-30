/**
 *  SavedDrinks.js
 *  Author: Anthony Mesa
 * 
 *  This module displays a list of the user's saved drinks.
 * 
 *  This module expects three properties, the client_id of the saved drinks to be 
 *  displayed, the dom_injecting_callback function to be run on each listing, and 
 *  the on_drink_click callback function to be run when a user clicks any of the
 *  listings. 
 * 
 *  Both callbacks take the argument _drink_data to make the element's drink data
 *  available to the caller of the Saved Drinks module.
 * 
 */

import './SavedDrinks.css'
import React, { useEffect } from 'react'

const SavedDrinks = ({ client_id, dom_injecting_callback, on_drink_click }) => {

  const [saved_drinks_dom, setSavedDrinksDom] = React.useState(null)
  const [is_loaded, setIsLoaded] = React.useState(false)

  const getSavedDrinks = (client_id) => {
    return new Promise(async (resolve, reject) => {

      const url = 'https://liquorish-server.azurewebsites.net/savedDrinks/' + client_id

      const response = await fetch(url);
      const jsonResponse = await response.json();
  
      resolve(jsonResponse.value)
    });
  }

  const generateSavedDrinksListDom = (_saved_drinks) => {
    return new Promise(async (resolve, reject) => {

      const handleSavedDrinkSelection = (_drink_data) => {
        if(on_drink_click != undefined)
        {
          on_drink_click(_drink_data)
        }
      }

      const saved_drinks_generator = await _saved_drinks.map((drink_data) =>
        <div key={JSON.stringify(drink_data)} className="savedDrink" onClick={() => { handleSavedDrinkSelection(drink_data) }}>
          <div>
            <div className="savedDrinkName">
              <h2>
                { drink_data["drink_name"] }
              </h2>
            </div>
            <div className="savedDrinkPrice">
              {(dom_injecting_callback != undefined) &&
              dom_injecting_callback(drink_data)}
            </div>
          </div>
        </div>
      );

      resolve(saved_drinks_generator)
    });
  }

  useEffect(() => {
    getSavedDrinks(client_id).then((_saved_drinks) => {
      generateSavedDrinksListDom(_saved_drinks).then((_saved_drinks_dom) => {
        setSavedDrinksDom(_saved_drinks_dom)
        setIsLoaded(true)
      })
    })
  }, [])

  return (
    <div className="savedDrinks">
      {is_loaded &&
      saved_drinks_dom }
    </div>
  );
}

export default SavedDrinks