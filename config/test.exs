use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :taskmaster3, Taskmaster3Web.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :taskmaster3, Taskmaster3.Repo,
  username: "taskmaster",
  password: "12345",
  database: "taskmaster3_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
