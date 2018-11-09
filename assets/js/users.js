import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';

function UserList(props) {
    let rows = _.map(props.users, (user) => <User key={user.id} user={user} />);
    console.log("got rows, now returning user list");
    return <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>;
}

function User(props) {
    let { user } = props;
    if (!user.admin) {
      return <tr>
        <td>{user.username}</td>
        <td>☐</td>
        <td><Link to={"/users/user/" + user.id.toString()}>profile</Link></td>
      </tr>;
    }
    else {
      return <tr>
        <td><strong>{user.username}</strong></td>
        <td><strong>☑</strong></td>
        <td><Link to={"/users/user/" + user.id.toString()}>profile</Link></td>
      </tr>
    }
}

export default connect((state) => {return {users: state.users};})(UserList);
