import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import GoogleLogin from "react-google-login";
class register extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
        if (localStorage.getItem('token') !== '') {
            this.props.history.push('/dashboard');
        }
    }

    handleClick(event) {
        var oThis = this;
        var apiBaseUrl = "https://localhost:5000/auth/signup";
        console.log("values", this.state.email, this.state.password);
        //To be done:check for empty values before hitting submit
        var payload = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    console.log("registration successfull");
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('permit', response.data.user.permit);
                    oThis.props.history.push('/dashboard');
                    window.location.reload();
                }
                // else if(response.status === 204){
                //     console.log("Account already exist");
                //     alert("Account already exist");
                // }
                else {
                    console.log("account exist");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Account with this email already exist or invalid email/password");
            });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Sign Up" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default register;