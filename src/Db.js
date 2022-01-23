
import React from 'react';
import './Db.css';

class Db_test_connection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            is_connected: false
        }
    }

    componendDidMount() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", 'http://liquorish-server.azurewebsites.net/test', false ); // false for synchronous request
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

export default Db_test_connection;