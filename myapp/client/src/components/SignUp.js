import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import * as actions from '../actions';
import CustomInput from './CustomInput';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    async onSubmit(formData) {
        console.log('onSubmit() got called');
        console.log('formData', formData);
        // We need to call some actioncreator
        await this.props.signUp(formData);
        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }
    }

    async responseGoogle(res) {
        console.log('responseGoogle', res);
        console.log('typeof res', typeof res);
        await this.props.oauthGoogle(res.accessToken);
        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }
    }

    async responseFacebook(res) {
        console.log('responseFacebook', res);
        await this.props.oauthFacebook(res.accessToken);
        if (!this.props.errorMessage) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="text"
                                id="email"
                                label="Enter your email"
                                placeholder="example@example.com"
                                component={CustomInput} />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="yoursuperpassword"
                                component={CustomInput} />
                        </fieldset>

                        {this.props.errorMessage ?
                            <div className="alert alert-danger">
                                {this.props.errorMessage}
                            </div> : null}

                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                </div>
                <div className="col">
                    <div className="text-center">
                        <div className="alert alert-primary">
                            Or sign up using third-party services
            </div>
                        <FacebookLogin
                            appId="240387603466089"
                            textButton="Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-outline-primary"
                        />
                        <GoogleLogin
                            clientId="674151268871-u6gkhhba4ho97pv2d4hjnh3b1l9nb2ob.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            className="btn btn-outline-danger"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(SignUp)

