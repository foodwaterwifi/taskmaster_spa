import store from './store';

class ServerAPI {
  fetch_path(path, onSuccess, onError) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: onSuccess,
      error: onError,
    });
  }

  send_post(path, data, onSuccess, onError) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: onSuccess,
      error: onError,
    });
  }

  send_put(path, data, onSuccess, onError) {
    $.ajax(path, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: onSuccess,
      error: onError,
    });
  }

  fetch_all_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        console.log("Fetched Users");
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_all_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        console.log("Fetched Tasks");
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_tasks_for_user(user_id) {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        console.log("Fetched Tasks");
        store.dispatch({
          type: 'TASK_LIST_FOR_USER',
          data: resp.data,
          user_id: user_id,
        });
      }
    );
  }

  create_session(username, password) {
    this.send_post(
      "/api/v1/sessions",
      {username, password},
      (resp) => {
        console.log("Created Session", _.assign(resp.data, { username }));
        store.dispatch({
          type: 'NEW_SESSION',
          data: _.assign(resp.data, { username }),
        });
      }
    );
  }

  delete_session() {
    store.dispatch({
      type: 'DELETE_SESSION'
    })
  }

  update_task(id, complete, time, user_id) {
    console.log("Update task called with id ", id);
    this.send_put(
      "/api/v1/tasks/" + id.toString(),
      {task: {complete, time, user_id}},
      (resp) => {
        console.log("Updated Task", resp);
        this.fetch_all_tasks(); // slow if this were a real site with lots of tasks
      }
    )
  }



}

export default new ServerAPI();
