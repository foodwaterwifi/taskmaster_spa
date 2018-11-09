defmodule Taskmaster3.Repo do
  use Ecto.Repo,
    otp_app: :taskmaster3,
    adapter: Ecto.Adapters.Postgres
end
