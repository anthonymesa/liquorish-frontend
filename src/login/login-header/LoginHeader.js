

import React from 'react';

//  Link Css for component
import './LoginHeader.css';
import logo from '../../media/logo.svg';

class LoginHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="login_form_user">
                <div class="row header">
                    <img src={ logo } width="200px" height="200px" alt="logo" />
                </div>
                <div class="row logoName">
                    <p>LIQUORISH</p>
                </div>
            </div>
        );
    }
}

export default LoginHeader;
