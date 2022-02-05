//  This defines the app's logic.

//  Link Css for component
import './LoginOverlay.css';

import React from 'react';
import logo from './logo.svg';
import { Link }from 'react-router-dom';

class LoginOverlay extends React.Component {
  constructor(props) {
    super(props);

    /*
      Again, binding these two functions so that we can reference
      'this' within them.
    */
    this.updateUsername = this.updateUsername.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    
    /*
      This reference allows us to get the dom element of the
      username input box. this is important because we will
      want the value of this box to get the username from when
      the user tries to login.
    */
    this.myTextInput = React.createRef();
  }

  /*
    Here we get the text from the input box by getting the .value from the
    reference to the box we created in the constructor. for more info on this,
    google 'react refs'. the 'current' I believe just means to make sure to get
    the most up-to-date values from the input element. Here we are calling the
    callback that was provided in the App module via the property onLoginUsernameUpdated
    with the value from the input box. so this should update the state value 'username'
    in the App module, and cause everything in the 'App' module to re-render.
    
    Because the button calling this function is wrapped in a Link (below), this code will
    update the 'username' value of the state in the App module, and then navigate to 
    the Home module, which, if you look in the App module, you will see it is provided
    a property that is the username variable of the App state that we just updated.
  */
  handleSignIn(){
    let value = this.myTextInput.current.value;
    this.props.onLoginUsernameUpdated(value);
  } 

  /*
    Thes functions below are just standins. I don't know that they will be required
    or expounded upon, but defining onClick methods for buttons just keeps react from
    getting mad at you for making buttins without any onclick functions.
  */
  createBar(){

  }

  userSignIn(){

  }

  render() {
    return (
      <div id="login_overlay">
        <div class="wrapper column">
          <div class="row header">
            <img src={ logo } width="200px" height="200px" alt="logo" />
          </div>
          <div class="row logoName">
            <p>LIQUORISH</p>
          </div>
          <div class="row desc">
            <p>Sign in to bar</p>
          </div>
          <div class="bodyContent">
            <div class="row">
              <form>
                {/* 
                  Here we have created the username input element, and we are defining
                  the reference that we created in the constructor to point to this dom element
                  so that we can get the text from this box elsewhere in our code.
                */}
                <input id="bar_username" type="text" ref={ this.myTextInput } />
              </form>
            </div>
            <div class="row">
              <input id="bar_password" type="password" placeholder="Password" />
            </div>
          </div>
          <div class="row">
            {/* 
              Here we have created a link element (provided by react-router-dom, it's imported at the top
              of the page). This link element, when clicked will navigate to "www.pageurl/home". because we
              set up routing in the App component, the App will render then the Home component. Before this
              linking takes place, onClick is evaluated (im not actually sure if this happens 'before' the link navigates
              to the next page, It could be that they are both run at the same time, and the onClick method 
              just finishes first). in this case, onclick is the handleSignIn function in this class.
            */}
            <Link to="/home">
              <button class="btnPrimary" onClick={ this.handleSignIn }>Sign In</button>
            </Link>
          </div>
          <div class="row">
            <button class="btnSecondary" onClick={ this.createBar } >New bar?</button>
          </div>
          <div class="row footer">
            <button class="btnSecondary" onClick={ this.userSignIn } >Sign in as user</button>
          </div>
        </div>
      </div>
    );
  }
}

//  Eport the function to be called elsewhere
export default LoginOverlay;
