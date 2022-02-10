import React from 'react';
import { Link } from 'react-router-dom';

//  Link Css for component
import './LoginFormUser.css';

class LoginFormUser extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
        this.updateLoginFormTypeHandler = this.updateLoginFormTypeHandler(this);

        this.user_username_input = React.createRef();
        this.user_password_input = React.createRef();
    }

    handleSignIn() {
        let value = this.user_username_input.current.value;
        this.props.onLoginUsernameUpdated(value);
    }

    createUserAlert() {
        alert("Visit your local Liquirish merchant to create an account.");
    }

    updateLoginFormTypeHandler() {
        this.props.updateLoginFormType("bar");
    }

    render() {
        return (
            <div id="login_form_user">
                <div class="row desc">
                    <p>Sign in to user</p>
                </div>
                <div class="bodyContent">
                    <div class="row">
                        <form>
                            <input id="user_username" type="text" placeholder="Username" ref={this.user_username_input} />
                        </form>
                    </div>
                    <div class="row">
                        <input id="user_password" type="password" placeholder="Password" ref={this.user_password_input} />
                    </div>
                </div>
                <div class="row">
                    <Link to="/home">
                        <button class="btnPrimary" onClick={ this.handleSignIn }>Sign In</button>
                    </Link>
                </div>
                <div class="row">
                    <button class="btnSecondary" onClick={ this.createUserAlert }>Sign Up</button>
                </div>
                <div class="row footer">
                    <Link to="/">
                        <button class="btnSecondary" onClick={ this.updateLoginFormTypeHandler }>Sign in as bar</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginFormUser;
