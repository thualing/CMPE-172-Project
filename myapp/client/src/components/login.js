import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }

    handleClick(event){
        var oThis = this;
        var apiBaseUrl = "https://localhost:5000/auth/login";
        var payload={
            "email":this.state.email,
            "password":this.state.password
        }
        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    console.log("Login successfull");
                    oThis.props.history.push('/dashboard');
                }
                else if(response.status === 204){
                    console.log("Email password do not match");
                    alert("Email password do not match")
                }
                else{
                    console.log("Email does not exists");
                    alert("Email does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
         <div>
             <MuiThemeProvider>
            <div>
                <TextField
                    hintText="Enter your email"
                    floatingLabelText="Email"
                    onChange = {(event,newValue) => this.setState({email:newValue})}
                />
                 <br/>
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    onChange = {(event,newValue) => this.setState({password:newValue})}
                />
                <br/>
                <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
             </div>
             </MuiThemeProvider>
         </div>
        );
    }
}
const style = {
    margin: 15,
};
export default login;