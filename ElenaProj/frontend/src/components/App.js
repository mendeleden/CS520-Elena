import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    render() {
        return ( 
            <Fragment>
                <h1> Dear Yurri,</h1>
                <p> Please give us an A </p>
            </Fragment>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('app'));