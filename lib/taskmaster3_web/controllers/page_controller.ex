defmodule Taskmaster3Web.PageController do
  use Taskmaster3Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
