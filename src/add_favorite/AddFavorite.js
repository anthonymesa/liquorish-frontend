
import React, { useEffect } from 'react'
import './AddFavorite.css'

import { BsHeartFill, BsHeart } from 'react-icons/bs'

export default function AddFavorite({user_id, drink_id}){

  const [is_favorite, setIsFavorite] = React.useState(false)
  const [is_loaded, setIsLoaded] = React.useState(false)

  const getIsFavorite = () => {
    return new Promise((resolve, reject) => {

      // Need to get make query to backend.

      resolve(false)
    })
  }

  const initializeAddFavorite = () => getIsFavorite(user_id, drink_id).then((_recent_is_favorite) => { setIsFavorite(_recent_is_favorite)})

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

  const handleAddFavCLick = () => {
    setIsFavorite(is_favorite ? false : true)
  }

  return(
    <div className="add-favorite" onClick={handleAddFavCLick}>
      { add_favorite_ui_element() }
    </div>
  )
}