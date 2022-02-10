import './Home.css';

import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <div>
            <p>
                Hey { this.props.username } !
            </p>
        </div>
    );
  }
}

//  Eport the function to be called elsewhere
export default Home;
