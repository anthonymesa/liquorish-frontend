
import React from 'react'

import HeaderV2 from '../headerv2/HeaderV2'

const AddRto = () => {

  return (
    <div>
      <HeaderV2 
        does_nav={true} 
        nav_name={"New Order"} 
        title={"Drinks Ready To Order!"}
        nav_link={"/dashboard/neworder"}/>
    </div>
  )
}

export default AddRto