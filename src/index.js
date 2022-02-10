import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Connect CSS stylesheet.
import './index.css';

// Import our main page modules.
import Login from './login/Login';
import Home from './home/Home';

class App extends React.Component {
  constructor(props) {
    super(props);

    /*
      Here we need to bind the handleUsernameUpdate function to the class
      so that we can use this.setState inside of it (binding makes sure that
      'this' references this class object)
    */
    this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this);

    /*
      Here we are keeping track of the username at the app level. we can
      pass this then to whatever module is displayed in the app via route by passing
      it as a prop to the module.
    */
    this.state = {
        username: "",
    }
  }

  /*
    This function defined at the app level is going to be used as a callback function
    that is provided as a property to other modules. when this callback function is run
    from within another module, since it is bound above, it will change the state of the
    app module's username variable. since a change in state causes the module to re-render,
    it should update in all modules that use the username value as well.
  */
  handleUsernameUpdate(temp_user){
    this.setState({username: temp_user});
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>

          {/* 
            Here a route is created to the / page, and we are passing the handleUsernameUpdate function
            as a callback inside the property named onLoginUsernameUpdated. in LoginOverlay, the onLoginUsernameUpdated
            property which contains the callback will be called to update the App module's state variable 'username'.
          */}
          <Route path="/" element={<Login onLoginUsernameUpdated={ this.handleUsernameUpdate } />} /> 

          {/*
            Here a route is created to the /home page, and we are passing the username stored in the App's state
            so that the home will display the username of the user logged in.
          */}
          <Route path="home" element={<Home username={ this.state.username }/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

//  This renders the code generated in the React.StrictMode 
//  section to the 'root' element of index.html listed in
//  the public directory, before it is built to the final
//  file in the build directory.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
