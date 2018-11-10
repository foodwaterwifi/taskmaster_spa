defmodule Taskmaster3Web.TaskView do
  use Taskmaster3Web, :view
  alias Taskmaster3Web.TaskView
  alias Taskmaster3.Repo

  def render("index.json", %{tasks: tasks}) do
    tasks = Repo.preload(tasks, :user);
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    task = Repo.preload(task, :user);
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    task = Repo.preload(task, :user);
    %{id: task.id,
      title: task.title,
      description: task.description,
      time: task.time,
      complete: task.complete,
      user: render_one(task.user, Taskmaster3Web.UserView, "user.json"),
      user_id: task.user_id}
  end
end
