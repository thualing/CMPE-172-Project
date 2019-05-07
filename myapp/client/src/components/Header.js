import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        console.log('signOut got called!');
        this.props.signOut();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
                <Link className="navbar-brand" to="/">CodeMan Payroll Auth</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">

                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        {!this.props.isAuth ?
                            [<li className="nav-item" key="register">
                                <Link className="nav-link" to="/register">Sign Up</Link>
                            </li>,
                                <li className="nav-item" key="login">
                                    <Link className="nav-link" to="/login">Log In</Link>
                                {/*</li>,*/}
                                            <li><Link className="nav-link" to="/jenkins">Jenkins</Link></li>

                            {/*<li className="nav-item" key="signin">*/}
                                {/*<Link className="nav-link" to="/signin">Sign In</Link>*/}
                            </li>,
                                <li><Link className="nav-link" to="/dashboard">Dashboard</Link></li>] : null}

                        {this.props.isAuth ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                <link className="nav-link" to="/jenkins">Jenkins</link>
                                <Link className="nav-link" to="/signout" onClick={this.signOut}>Sign Out</Link>
                            </li> : null}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps, actions)(Header);

