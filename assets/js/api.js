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
    this.send_put(
      "/api/v1/tasks/" + id.toString(),
      {task: {complete, time, user_id}},
      (resp) => {
        this.fetch_all_tasks(); // slow if this were a real site with lots of tasks
      }
    )
  }

  create_user(username, password, password_confirmation) {
    this.send_post(
      "/api/v1/users",
      {user: {username, password, password_confirmation, admin: false}},
      (resp) => {
        this.fetch_all_users();
        this.redirect("/users");
      }
    )
  }

  create_task(title, description, user_id) {
    this.send_post(
      "/api/v1/tasks",
      {task: {title, description, user_id, time: 0, complete: false}},
      (resp) => {
        this.fetch_all_tasks();
        this.redirect("/tasks")
      }
    )
  }

  redirect(link) {
    store.dispatch({
      type: 'REDIRECT',
      data: link
    })
  }
}

export default new ServerAPI();
