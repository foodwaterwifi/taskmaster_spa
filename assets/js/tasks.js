import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';

import { MinutesToTimeString } from "./misc_tools";
import api from "./api";

function TaskListF(props) {
    let rows = _.map(props.tasks, (task) => <Task key={task.id} task={task} />);
    return <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Assignee</th>
              <th>Time Spent</th>
              <th>Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>;
}

function MyTaskListF(props) {
  if (props.session != null) {
    let tasks = _.filter(props.tasks, (task) => (task.user_id == props.session.user_id));
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
    return <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.user.username}</td>
      <td>{task.time}</td>
      <td>{checkbox}</td>
      <td><Link to={"/tasks/task/" + task.id.toString()}>view</Link></td>
    </tr>;
}

function TaskViewF(props) {
  console.log("task view loaded", props.taskId);
  let task = _.find(props.tasks, (task) => (task.id == props.taskId));
  console.log(task);
  if (task != null) {
    let onLogButtonClicked = () => {
      let time = parseInt($("#log-time").val());
      console.log("Logged ", time);
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


export let TaskList = connect((state) => {return {tasks: state.tasks};})(TaskListF);
export let MyTaskList = connect((state) => {return {tasks: state.tasks, session: state.session};})(MyTaskListF);
export let TaskView = connect((state) => {return {tasks: state.tasks, users: state.users};})(TaskViewF);
