defmodule Taskmaster3.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, default: "", null: false
      add :password_hash, :string, default: "", null: false
      add :admin, :boolean, default: false, null: false

      timestamps()
    end

    create index(:users, [:username], unique: true)
  end
end
