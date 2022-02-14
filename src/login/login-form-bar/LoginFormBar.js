import React from 'react';
import { Link } from 'react-router-dom';

//  Link Css for component
import './LoginFormBar.css';

class LoginFormBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleSignIn = this.handleSignIn.bind(this);
        this.updateLoginFormTypeHandler = this.updateLoginFormTypeHandler.bind(this);

        this.bar_username_input = React.createRef();
        this.bar_password_input = React.createRef();
    }

    handleSignIn() {
        let value = this.bar_username_input.current.value;
        this.props.onLoginUsernameUpdated(value);
    }

    createUserAlert() {
        alert("todo");
    }

    updateLoginFormTypeHandler() {
        this.props.updateLoginFormType("user");
    }

    render() {
        return (
            <div id="login_form_user">
                <div class="row desc">
                    <p>Sign in to bar</p>
                </div>
                <div class="bodyContent">
                    <div class="row">
                        <form>
                            <input id="user_username" type="text" placeholder="Bar Username" ref={this.bar_username_input} />
                        </form>
                    </div>
                    <div class="row">
                        <input id="user_password" type="password" placeholder="Password" ref={this.bar_password_input} />
                    </div>
                </div>
                <div class="row">
                    <Link to="/home">
                        <button class="btnPrimary" onClick={ this.handleSignIn }>Sign In</button>
                    </Link>
                </div>
                <div class="row">
                    <button class="btnSecondary" onClick={ this.createUserAlert }>Create Merchant Account</button>
                </div>
                <div class="row footer">
                    <Link to="/">
                        <button class="btnSecondary" onClick={ this.updateLoginFormTypeHandler }>Sign in as user</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default LoginFormBar;
