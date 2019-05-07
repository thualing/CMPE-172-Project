import React, { Component } from 'react';
import axios from 'axios'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            showMessage: false
        }

        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        let oThis = this;

        axios.get('https://localhost:5000/users')
            .then(function(response) {
                // console.log(response.data[0]);
                oThis.setState({
                    showMessage: true,
                    username: JSON.stringify(response.data[0])
                });
                console.log("username: " + oThis.state.username);
            });
    }


    render() {
        return (
            <div>
                <p><font size="15">Welcome to CodeMan Payroll System!</font></p>
                <button className='btn btn-primary' onClick={this.handleClick}>Click Me</button>
                <div>{ this.state.showMessage && (<div>{this.state.username}</div>) }</div>
            </div>
        )
    }
}

export default Home;