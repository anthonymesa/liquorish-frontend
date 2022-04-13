
import React, { useEffect } from 'react'
import './AddFavorite.css'

import { BsHeartFill, BsHeart } from 'react-icons/bs'

export default function AddFavorite({user_id, drink_id}){

  const [is_favorite, setIsFavorite] = React.useState(false)
  const [is_loaded, setIsLoaded] = React.useState(false)

  const getIsFavorite = () => {
    return new Promise(async (resolve, reject) => {

    const url = 'https://liquorish-server.azurewebsites.net/getIsSaved/' + user_id + '/' + drink_id;
    const response = await fetch(url)
    const jsonResponse = await response.json();
        console.log(user_id + " " + drink_id + " " + JSON.stringify(jsonResponse.value))
      resolve(jsonResponse.value)
    });
  }

  const initializeAddFavorite = () => getIsFavorite(user_id, drink_id).then((_recent_is_favorite) => { setIsFavorite(JSON.parse(_recent_is_favorite))})

  useEffect(() => {
    initializeAddFavorite()
  }, [])

  const add_favorite_ui_element = () => {
    if(is_favorite){
      return <BsHeartFill />
    } else {
      return <BsHeart />
    }
  }

  const removeFavorite = () => {
    return new Promise(async (resolve, reject) => {
        const url = 'https://liquorish-server.azurewebsites.net/deleteSavedDrink/' + user_id + '/' + drink_id;
        const response = await fetch(url)
        const jsonResponse = await response.json();
        console.log(JSON.stringify(jsonResponse.value))

          resolve(jsonResponse.value)
        });
  }

  const addFavorite = () => {
    return new Promise(async (resolve, reject) => {
        const url = 'https://liquorish-server.azurewebsites.net/addSavedDrink/' + user_id + '/' + drink_id;
        const response = await fetch(url)
        const jsonResponse = await response.json();
        console.log(JSON.stringify(jsonResponse.value))

          resolve(jsonResponse.value)
        });
  }

  const handleAddFavCLick = () => {
    if(is_favorite == true)
    {
        console.log('was true')
        removeFavorite().then(() => {
            setIsFavorite(false)
        })
    } else {
        console.log('was false')
        addFavorite().then(() => {
            setIsFavorite(true)
        })
    }
  }

  return(
    <div className="add-favorite" onClick={handleAddFavCLick}>
      { add_favorite_ui_element() }
    </div>
  )
}