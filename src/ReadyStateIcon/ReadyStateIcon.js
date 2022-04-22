import './ReadyStateIcon.css';
import React, { useEffect } from 'react';
import { MdAlarm, MdAlarmOn, MdCheckCircleOutline } from "react-icons/md";

export default function ReadyStateIcon({ drink_data }){
    
	const UpdateDrinkReadyState = (state) => {
		return new Promise(async (resolve, reject) => {			        
			const url = "https://liquorish-server.azurewebsites.net/updateReadyStatus"

			const post_args = {
				method: "post",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
	
				//make sure to serialize your JSON body
				body: JSON.stringify({
					order_num: drink_data.order_num,
					ready_status: state
				})
			}
	
			return new Promise(async (resolve, reject) => {
				const response = await fetch(url, post_args);
				const jsonResponse = await response.json();
				resolve(jsonResponse.value)
			});
        });
	}

	const HandleOnClick = () => {
		if(drink_data.ready_status === 0){
			UpdateDrinkReadyState(1).then(() => {})
		}
		if(drink_data.ready_status === 1){
			UpdateDrinkReadyState(2).then(() => {})
		}
	}

	// new drink, yet to be fixed by bartender
    if(drink_data.ready_status === 0){
        return (
            <div onClick={HandleOnClick}>
                <MdAlarm />
            </div>
        )
    }

	// bartender has completed order, waiting for pickup
    else if (drink_data.ready_status === 1){
        return (
            <div onClick={HandleOnClick}>
                <MdAlarmOn />
            </div>
        )  
    }

	// patron has recieved drink, but has yet to pay
    else if (drink_data.ready_status === 2){
        return (
            <div onClick={HandleOnClick}>
                <MdCheckCircleOutline />
            </div>
        )  
    }
}