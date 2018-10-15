import React, {Component} from 'react';
import {connect} from 'react-redux';

class Users extends Component {
  render() {
    // TODO: add users!
    // const users = this.props.user.users;

    return (
      <div className='text-center'>
        <br/>
        <h1>Users Go Here</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Users);
