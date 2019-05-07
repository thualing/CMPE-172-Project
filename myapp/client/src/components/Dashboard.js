import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import tb from './table';

class Dashboard extends Component {
  async componentDidMount() {
    // this.props.getSecret()
  }

  render() {
      var taleCell = tb;
    return (
      <div>
        {/*This is a Dashboard component*/}
        {/*<br />*/}
        {/*Our secret: <h3>{this.props.secret}</h3>*/}
        <div>{taleCell()}</div>
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