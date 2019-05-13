import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import tb from './table';
import onetb from './oneTable';

class Dashboard extends Component {

  async componentDidMount() {
    // this.props.getSecret()
  }

    isAuth() {
        if (localStorage.getItem('token') === '') {
            return false;
        }
        return true;
    }

    callTable() {
      if (localStorage.getItem('permit') === 'employee') {
          return onetb();
      }
      else {
          return tb();
      }
    }

  render() {
      var taleCell = tb;

    return (
      <div>
          {!this.isAuth() ?
              <div>
                  <p>Don't have access to this page, please Log in or Sign up</p>

              </div>
              : null}
          {this.isAuth()?
              <div>
                  <p><font size="12">User type: {localStorage.getItem('permit')}</font></p>
                  {this.callTable()}
              </div>
              : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret
  }
}

export default connect(mapStateToProps, actions)(Dashboard);