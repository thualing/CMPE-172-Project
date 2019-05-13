import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

class login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
        if (localStorage.getItem('token') !== '') {
            this.props.history.push('/dashboard');
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
                    localStorage.setItem('token', response.data.token);
                    console.log(localStorage.getItem('token'));
                    localStorage.setItem('permit', response.data.user.permit);
                    oThis.props.history.push('/dashboard');
                    window.location.reload();
                }
                // else if(response.status === 204){
                //     console.log("Email password do not match");
                //     alert("Email password do not match")
                // }
                // else{
                //     console.log("Email does not exists");
                //     alert("Email does not exist");
                // }
                else {
                    console.log("Email password value do not match");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Email password do not match");
            });
    }

    responseGoogle(response) {
        var googleToken = response.Zi.id_token;
        console.log(googleToken);
        if (googleToken !== '') {
            localStorage.setItem('token', googleToken);
            window.location.reload();
        }
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
                 <GoogleLogin
                     clientId="674151268871-u6gkhhba4ho97pv2d4hjnh3b1l9nb2ob.apps.googleusercontent.com"
                     buttonText="Google"
                     onSuccess={this.responseGoogle}
                     onFailure={this.responseGoogle}
                     className="btn btn-outline-danger"
                 />
             </MuiThemeProvider>
         </div>
        );
    }
}
const style = {
    margin: 15,
};
export default login;