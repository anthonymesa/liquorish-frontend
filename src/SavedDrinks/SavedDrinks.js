
import './SavedDrinks.css'
import React from 'react'

const SavedDrinks = () => {

  const [saved_drinks_dom, setSavedDrinksDom] = React.useState(null)

  return (
    <div>
      SavedDrinks
      { saved_drinks_dom }
    </div>
  );
}

export default SavedDrinks