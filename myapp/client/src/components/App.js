import React from 'react';
import Header from './Header';

//const http = require('http');


export default (props) => {
    return (

        <div>
            <Header />
            <div className="container">
                {props.children}
            </div>

        </div>
    );
};

