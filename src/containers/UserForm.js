import React, {Component} from 'react';
import {connect} from 'react-redux';

class Users extends Component {
  renderUsers(users) {
    let items = [];

    for (let index in users) {
      const user = users[index];
      items.push(
        <p>{user.name}</p>
      );
    }

    return items;
  }

  render() {
    const users = this.props.user.users;

    return (
      <div className='text-center'>
        <br/>
        <h1>Users</h1>
        { this.renderUsers(users) }
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
