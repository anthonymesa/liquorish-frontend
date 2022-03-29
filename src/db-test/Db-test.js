
import React from 'react';

import './Db.css';

class DbTestConnection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            is_connected: false
        }
    }

    componentDidMount() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", 'https://liquorish-server.azurewebsites.net/test', false ); // false for synchronous request
        xmlHttp.send( null );
        this.setState({is_connected: xmlHttp.responseText});
    }

    render() {
        return (
            <div id="Db_test_connection">
                <p>
                    { this.state.is_connected }
                </p>
            </div>
        )
    }
}

export default DbTestConnection;