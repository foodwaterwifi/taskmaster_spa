defmodule Taskmaster3Web.SessionController do
  use Taskmaster3Web, :controller

  alias Taskmaster3.Users
  alias Taskmaster3.Users.User

  def create(conn, %{"username" => username, "password" => password}) do
    IO.puts "Session Create Requested"
    IO.puts "Username: " <> username <> " | Password: " <> password
    with %User{} = user <- Users.get_and_auth_user(username, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(Taskmaster3Web.Endpoint, "user auth", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end

end
