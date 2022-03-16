
import { useEffect, useState } from 'react';

export default function ValidateAuth() {

  /**
   * This state defines whether the user has been authorised previously or not.
   */
  const [is_auth, setIsAuth] = useState(false);

  const getAuth = new Promise((resolve, reject) => {
    const auth_string = sessionStorage.getItem('is_auth');
    const auth_value = JSON.parse(auth_string);
    resolve(auth_value === null ? false : auth_value);
  });

  useEffect(() => {
    let mounted = true;

    getAuth.then((auth_value) => {
      if(mounted){
        console.log(auth_value)
        setIsAuth(auth_value);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * This function is relatively unsafe right now in that any value can be applied,
   * but it should only be used for applying 'true' or 'false' values.
   * 
   * @param {*} value 
   * @returns 
   */
  const saveAuth = (value) => {
    return new Promise((resolve, reject) => {
      sessionStorage.setItem('is_auth', JSON.stringify(value));
      setIsAuth(value);
      resolve();
    });
  }

  return {
    setAuth: saveAuth,
    is_auth
  }
}


