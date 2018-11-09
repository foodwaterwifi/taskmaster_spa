defmodule Taskmaster3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, default: "", null: false
      add :description, :text, default: "", null: false
      add :time, :integer, default: 0, null: false
      add :complete, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nilify_all), null: false

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
