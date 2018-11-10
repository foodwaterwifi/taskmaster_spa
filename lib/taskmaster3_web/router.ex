defmodule Taskmaster3Web.Router do
  use Taskmaster3Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Taskmaster3Web do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index

    get "/users", PageController, :index
    get "/users/register", PageController, :index
    get "/users/user/:id", PageController, :index
    get "/tasks", PageController, :index
    get "/tasks/create", PageController, :index
    get "/tasks/task/:id", PageController, :index
  end

  scope "/api/v1", Taskmaster3Web do
    pipe_through :api

    resources "/sessions", SessionController, only: [:create]
    resources "/tasks", TaskController
    resources "/users", UserController
  end
end
