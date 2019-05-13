import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';

class dataSet extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: [],
            token: localStorage.getItem('token')
        }
        this.getDataOnce()
    }

    getDataOnce() {
        let oThis = this;
        var items = [];
        const AuthStr = 'Bearer '.concat(this.state.token);
        axios.get("https://localhost:5000/data", { headers: { Authorization: AuthStr } })
            .then(function (response) {






                oThis.setState({data: response.data});
                console.log(JSON.stringify(oThis.state.data));
            });
    }

    render() {
        return (
            <MDBDataTable
                striped
                bordered
                hover
                data={this.state.data}
            />
        );
    }
}

export default dataSet;