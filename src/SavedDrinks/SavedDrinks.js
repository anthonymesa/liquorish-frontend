
import './SavedDrinks.css'
import React, { useEffect } from 'react'

const SavedDrinks = () => {

  const [saved_drinks_dom, setSavedDrinksDom] = React.useState(null)
  const [is_loaded, setIsLoaded] = React.useState(false)

  const getSavedDrinks = (_client_id) => {
    return new Promise((resolve, reject) => {
      resolve(_client_id)
    });
  }

  const generateSavedDrinksListDom = (_saved_drinks) => {
    return new Promise((resolve, reject) => {
      resolve(_saved_drinks)
    });
  }

  useEffect(() => {

    const client_id = sessionStorage.getItem('client_id')

    getSavedDrinks(client_id).then((_saved_drinks) => {
      generateSavedDrinksListDom(_saved_drinks).then((_saved_drinks_dom) => {
        setSavedDrinksDom(_saved_drinks_dom)
        setIsLoaded(true)
      })
    })
  }, [])

  return (
    <div>
      SavedDrinks
      {is_loaded &&
      saved_drinks_dom }
    </div>
  );
}

export default SavedDrinks