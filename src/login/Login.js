//  This defines the app's logic.

//  Link Css for component
import './Login.css';

import React from 'react';
import LoginFormUser from './login-form-user/LoginFormUser';
import LoginFormBar from './login-form-bar/LoginFormBar';
import LoginHeader from './login-header/LoginHeader';
 

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.attemptLoginHandler = this.attemptLoginHandler.bind(this);

    this.state = {
      hash: ""
    }
  }
  
  attemptLoginHandler(type, username, password){
    //  convert password to hash and then make database call
    const utf8 = new TextEncoder().encode(password);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');

        let url = 'http://liquorish-server.azurewebsites.net/login/' + username + '/' + hashHex.toUpperCase();

        console.log(url);
    
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false ); // false for synchronous request
        xmlHttp.send( null );
        console.log(xmlHttp.responseText);
    });
  }

  render() {

    let form;
    switch(this.props.applicationState.get.client_type){
      case "user":
        form = <LoginFormUser applicationState={ this.props.applicationState } attemptLogin={ this.attemptLoginHandler }/>;
        break;
      case "bar":
        form = <LoginFormBar applicationState={ this.props.applicationState } attemptLogin={ this.attemptLoginHandler }/>;
        break;
    }

    return (
      <div>
        <p>{this.props.applicationState.get.client_id}</p>
        <p>{this.state.hash}</p>
        <LoginHeader />
        { form }
      </div>
    );
  }
}

//  Eport the function to be called elsewhere
export default Login;
