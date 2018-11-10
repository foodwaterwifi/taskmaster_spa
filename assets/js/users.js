import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import _ from 'lodash';

import api from "./api";
import { UserTaskList } from "./tasks";

function UserListF(props) {
    let rows = _.map(props.users, (user) => <User key={user.id} user={user} />);
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

function UserViewF(props) {
  let user = _.find(props.users, (user) => (user.id == props.userId))
  if (user != null) {
    let checkbox = user.admin ? "☑" : "☐";
    return <div>
      <h2><strong>User:</strong> {user.username}</h2>
      <h4><strong>Admin:</strong> {checkbox}</h4>
      <h4><strong>Assigned Tasks</strong></h4>
      <UserTaskList userId={user.id} />
    </div>
  }
  else {
    return null;
  }
}

function UserRegistrationF(props) {
  let redirectLink = props.redirect;
  if (redirectLink != null) {
    api.redirect(null); // This is bad, but I absolutely can not figure out how else to get around this.
    return <Redirect to={redirectLink}/>;
  }
  let onRegisterButtonClicked = () => {
    let username = $("#register-username").val();
    let pass1 = $("#register-password");
    let pass2 = $("#register-password-confirm");
    let pass1val = pass1.val();
    let pass2val = pass2.val();
    let validityMessage = "Passwords must match."
    if (pass1val == pass2val) {
      validityMessage = "";
      api.create_user(username, pass1val, pass2val);
    }
    pass1[0].setCustomValidity(validityMessage);
    pass2[0].setCustomValidity(validityMessage);
  }
  let validateLength = (e) => {
    if (e.target.value.length < 8) {
      e.target.setCustomValidity("Your password must be at least 8 characters long.");
    } else {
      e.target.setCustomValidity("");
    }
  }
  return <div className="row">
    <div className="col-12">
      <h2>User Registration</h2>
      <div className="form-group mx-3 my-3">
        <label>Username</label>
        <input className="form-control mb-1" id="register-username" required="required" type="text" />
        <label>Password (must be at least 8 characters long)</label>
        <input className="form-control mb-2" id="register-password" required="required" type="password"
          onChange={validateLength}/>
        <label>Confirm Password</label>
        <input className="form-control mb-2" id="register-password-confirm" required="required" type="password"
          onChange={validateLength}/>
        <button className="btn btn-primary mr-3" onClick={onRegisterButtonClicked}>Register</button>
      </div>
    </div>
  </div>;
}

export let UserList = connect((state) => {return {users: state.users};})(UserListF);
export let UserView = connect((state) => {return {users: state.users};})(UserViewF);
export let UserRegistration = connect((state) => {return {redirect: state.redirect};})(UserRegistrationF);
