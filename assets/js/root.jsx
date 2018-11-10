import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Link, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import api from './api';

import { NavbarLogin, NavbarProfileLink } from "./sessions"
import { UserList, UserView, UserRegistration } from "./users"
import { TaskList, MyTaskList, TaskView, TaskCreation } from "./tasks"

export default function root_init(node, store) {
  ReactDOM.render(<Provider store={store}><Root store={store}/></Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);

    //api.create_session("nyaruko", "admin");
    api.fetch_all_users();
    api.fetch_all_tasks();
  }

  redirect() {
    let state = this.props.store.getState();
    console.log("Test:", this.props);
    let link = state.redirect;
    if (link != null) {
      api.redirect(null);
      return <Redirect to={link}/>;
    }
    else {
      return null;
    }
  }

  render() {
    return <div>
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" render={() => <Redirect to="/tasks"/>} />
          <Route exact path="(/users|/tasks)" render={() => {
              return <div className="row">
                <div className="col-7">
                  <Route exact path="/tasks" component={TasksPage} />
                  <Route exact path="/users" component={UsersPage} />
                </div>
                <div className="col-5">
                  <MyTasks/>
                </div>
              </div>;
            }}
          />
          <Route exact path="/users/register" render={() => <UserRegistration/>} />
          <Route path="/users/user/:id" render={({match}) => <UserView userId={match.params.id}/>} />
          <Route exact path="/tasks/create" render={() => <TaskCreation/>} />
          <Route path="/tasks/task/:id" render={({match}) => <TaskView taskId={match.params.id}/>} />
        </div>
      </Router>
    </div>;
  }

}

function Navbar(params) {
  return <nav className="navbar navbar-expand-sm navbar-light bg-white mb-3">
    <Link className="navbar-brand" to={"/"}>Taskmaster</Link>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to={"/tasks"}>Tasks</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={"/users"}>Users</Link>
      </li>
      <NavbarProfileLink/>
    </ul>
    <ul className="navbar-nav navbar-right">
      <NavbarLogin />
    </ul>
  </nav>;
}

function TasksPage() {
  return <div>
    <h3 className="d-inline mr-3">All Tasks</h3>
    <Link className="btn btn-success" to="/tasks/create">Create New</Link>
    <TaskList/>
  </div>;
}

function UsersPage() {
  return <div>
    <h3>All Users</h3>
    <UserList/>
  </div>;
}

function MyTasks() {
  return <div>
    <h3>My Tasks</h3>
    <MyTaskList/>
  </div>;
}
