import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import _ from "lodash";
import $ from "jquery";

import api from "./api"

function NavbarLoginF(params) {
  let loggedIn = params.session != null;
  if (loggedIn) {
    return <span>
      Hello, {params.session.username}!&nbsp;
      <Link to={"/"} onClick={() => {api.delete_session()}}>Logout</Link>
    </span>;
  }
  else {
    let onLoginButtonClicked = () => {
      let username = $("#login-username").val();
      let password = $("#login-password").val();
      api.create_session(username, password);
    }
    return <li className="dropdown">
      <a className="dropdown-toggle nav-link" href="#" data-toggle="dropdown">Login/Register</a>
      <ul className="dropdown-menu">
        <li>
          <div className="form-inline mx-3 my-3">
            <label>Username</label>
            <input className="form-control mb-1" id="login-username" type="text" />
            <label>Password</label>
            <input className="form-control mb-2" id="login-password" type="password" />
            <button className="btn btn-primary mr-3" onClick={onLoginButtonClicked}>Login</button>
            <Link to={"/users/register"}>Register</Link>
          </div>
        </li>
      </ul>
    </li>;
  }
}

function NavbarProfileLinkF(props) {
  if (props.session != null) {
    return <li className="nav-item">
      <Link className="nav-link" to={"/users/user/" + props.session.user_id.toString()}>My Profile</Link>
    </li>
  }
  else {
    return null;
  }
}

export let NavbarLogin = connect((state) => {return {session: state.session};})(NavbarLoginF);
export let NavbarProfileLink = connect((state) => {return {session: state.session};})(NavbarProfileLinkF);
