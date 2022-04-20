import './ReadyStateIcon.css';
import React, { useEffect } from 'react';
import { MdAlarm, MdAlarmOn, MdCheckCircleOutline } from "react-icons/md";

export default function ReadyStateIcon({ ready_state }){
    
    if(ready_state == 0){
        return (
            <div>
                <MdAlarm />
            </div>
        )        
    }

    else if (ready_state == 1){
        return (
            <div>
                <MdAlarmOn />
            </div>
        )  
    }

    else if (ready_state == 2){
        return (
            <div>
                <MdCheckCircleOutline />
            </div>
        )  
    }
}