
import { useState } from 'react';

export default function ValidateAuth() {
    const getAuth = () => {
        const auth_string = sessionStorage.getItem('is_auth')
        const auth_value = JSON.parse(auth_string)
        return auth_value === null ? false : auth_value
    }

    const [is_auth, setIsAuth] = useState(getAuth());

    const saveAuth = (value, cb) => {
        if((value === true) || (value === false)){
            sessionStorage.setItem('is_auth', JSON.stringify(value))
            setIsAuth(value);
            cb()
        }
    }

    return { 
        setAuth: saveAuth, 
        is_auth 
    }
}


