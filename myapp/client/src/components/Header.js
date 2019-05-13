import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }

    isAuth() {
        if (localStorage.getItem('token') === '') {
            return false;
        }
        return true;
    }

    signOut() {
        console.log('signOut got called!');
        localStorage.setItem('token', '');
        localStorage.setItem('permit', 'employee');
        console.log(localStorage.getItem('token'));
        this.props.push('/');
        // window.location.reload();
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
                        {!this.isAuth() ?
                           [
                                <li className="nav-item" key="login">
                                    <Link className="nav-link" to="/login">Log In</Link>
                                </li>
                            ] : null}

                        {this.isAuth() ?
                            [<li className="nav-item" key="dashboard">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>,
                            <li className="nav-item" key="jenkins">
                                <Link className="nav-link" to="/jenkins">Jenkins</Link>
                            </li>,
                            <li className="nav-item" key="signout">
                                <Link className="nav-link" to="/" onClick={this.signOut}>Sign Out</Link>
                            </li>
                           ] : null}
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Header;

