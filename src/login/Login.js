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
  
    this.updateLoginFormTypeHandler = this.updateLoginFormTypeHandler.bind(this);

    this.state = {
      form_type: "user"
    }
  }

  updateLoginFormTypeHandler(value){
    this.setState({form_type: value});
  }

  render() {

    let form;

    switch(this.state.form_type){
      case "user":
        form = <LoginFormUser updateLoginFormType={ this.updateLoginFormTypeHandler }/>;
        break;
      case "bar":
        form = <LoginFormBar updateLoginFormType={ this.updateLoginFormTypeHandler }/>;
        break;
    }

    return (
      <div>
        <LoginHeader />
        { form }
      </div>
    );
  }
}

//  Eport the function to be called elsewhere
export default Login;
