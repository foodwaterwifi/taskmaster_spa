import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';

import { MinutesToTimeString } from "./misc_tools";
import api from "./api";

function TaskListF(props) {
  let rows = _.map(props.tasks, (task) => <Task key={task.id} task={task} hideRows={props.hideRows} />);
  let header = <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Assignee</th>
      <th>Time Spent</th>
      <th>Completed</th>
      <th></th>
    </tr>
  </thead>;
  console.log("Hiding rows: ", props.hideRows);
  if (props.hideRows == true) {
    header = <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Completed</th>
        <th></th>
      </tr>
    </thead>;
  }
  return <table className="table table-striped">
    {header}
    <tbody>
      {rows}
    </tbody>
  </table>;
}

function UserTaskListF(props) {
  let user_id = props.userId;
  if (user_id) {
    let tasks = _.filter(props.tasks, (task) => (task.user_id == user_id));
    let new_props = _.clone(props);
    new_props.tasks = tasks;
    return TaskListF(new_props);
  } else {
    return null;
  }
}

function Task(props) {
    let { task } = props;
    let checkbox = task.complete ? "☑" : "☐";
    if (props.hideRows) {
      return <tr>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{checkbox}</td>
        <td><Link to={"/tasks/task/" + task.id.toString()}>view</Link></td>
      </tr>;
    }
    else {
      return <tr>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.user.username}</td>
        <td>{task.time}</td>
        <td>{checkbox}</td>
        <td><Link to={"/tasks/task/" + task.id.toString()}>view</Link></td>
      </tr>;
    }
}

function TaskViewF(props) {
  let task = _.find(props.tasks, (task) => (task.id == props.taskId));
  if (task != null) {

    let onLogButtonClicked = () => {
      let time = parseInt($("#log-time").val());
      api.update_task(task.id, task.complete, task.time + time, task.user_id);
    };
    let completeChanged = (complete) => {
      api.update_task(task.id, complete, task.time, task.user_id);
    };
    let onReassignButtonClicked = () => {
      let userId = parseInt($("#reassign-dropdown").val());
      api.update_task(task.id, task.complete, task.time, userId);
    }

    let checkbox = task.complete ? "☑" : "☐";
    return <div>
      <h2><strong>{checkbox} Task:</strong> {task.title}</h2>
      <h4><strong>Assignee:</strong> <Link to={"/users/user/" + task.user_id.toString()}>{task.user.username}</Link></h4>
      <h4><strong>Description:</strong> {task.description}</h4>
      <br/>
      {(() => {
        if (!task.complete) {
          return <div>
            <button className="btn btn-primary" onClick={() => completeChanged(true)}>Complete</button>
            <br/><br/>
            <h4><strong>Time Logged: 🕑</strong> {MinutesToTimeString(task.time)}</h4>
            <div className="form-inline">
                <input className="form-control mr-2" id="log-time" type="number" step="15" min="0" defaultValue="15" />
                <button className="btn btn-success" onClick={onLogButtonClicked}>Log Minutes</button>
            </div>
          </div>;
        }
        else {
          return <div>
            <button className="btn btn-warning" onClick={() => completeChanged(false)}>Uncomplete</button>
          </div>;
        }
      })()}
      <br/>
      <h4><strong>Reassign Task</strong></h4>
      <div className="form-inline">
        <select id="reassign-dropdown" className="form-control mr-2">
          {_.map(props.users, (user) => <option key={user.id.toString()} value={user.id.toString()}>{user.username}</option>)}
        </select>
        <button className="btn btn-primary" onClick={onReassignButtonClicked}>Reassign</button>
      </div>
    </div>;
  }
  else {
    return null;
  }
}

function TaskCreationF(props) {
  console.log("Task creation");
  console.log(props);
  if (props.session == null) {
    return null;
  }

  let redirectLink = props.redirect;
  if (redirectLink != null) {
    api.redirect(null); // This is bad, but I absolutely can not figure out how else to get around this.
    return <Redirect to={redirectLink}/>;
  }
  let onCreateButtonClicked = () => {
    let title = $("#task-title").val();
    let desc = $("#task-desc").val();
    api.create_task(title, desc, props.session.user_id);
  }
  return <div className="row">
    <div className="col-12">
      <h2>Create Task</h2>
      <div className="form-group mx-3 my-3">
        <label>Title</label>
        <input className="form-control mb-1" id="task-title" required="required" type="text" />
        <label>Description</label>
        <input className="form-control mb-1" id="task-desc" required="required" type="text" />
        <button className="btn btn-primary mr-3" onClick={onCreateButtonClicked}>Create</button>
      </div>
    </div>
  </div>;
}


export let TaskList = connect((state) => {return {tasks: state.tasks};})(TaskListF);
export let MyTaskList = connect((state) => {return {tasks: state.tasks, userId: (state.session != null) ? state.session.user_id : null, hideRows: true };})(UserTaskListF);
export let UserTaskList = connect((state) => {return {tasks: state.tasks };})(UserTaskListF); // pass in own user_id
export let TaskView = connect((state) => {return {tasks: state.tasks, users: state.users};})(TaskViewF);
export let TaskCreation = connect((state) => {return {tasks: state.tasks, session: state.session, redirect: state.redirect};})(TaskCreationF);
