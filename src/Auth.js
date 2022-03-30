
/**
 * Gets the authorization indicator from the session storage. If it hasnt been
 * set yet, then false is returned.
 * 
 * @returns 
 */
const getAuth = () => {
  return new Promise((resolve, reject) => {

    const auth_value = (sessionStorage.getItem('is_auth') == 'true');

    setAuth(auth_value);

    resolve(auth_value);
  })
}

/**
 * This function is relatively unsafe right now in that any value can be applied,
 * but it should only be used for applying 'true' or 'false' values. Maybe this
 * would be fixed with Typescript? Or we can just do a type guard maybe?
 * 
 * If there was an issue setting the value, then this call is rejected.
 * 
 * @param {boolean} value The boolean value indicating authorization status
 * @returns Nothing
 */
const setAuth = (value) => {
  return new Promise((resolve, reject) => {

    /** 
     * Set the is_auth value in session storage.
     */
    sessionStorage.setItem('is_auth', JSON.stringify(value));

    /**
     * If the value that was supposed to be set matches the value now retrieved
     * from the session storage, then resovle in success, else, reject.
     */
    if (value === (sessionStorage.getItem('is_auth') == 'true')) {
      console.log('auth set successfully');
      resolve();
    } else {
      reject();
    }
  });
}

module.exports = { setAuth, getAuth }