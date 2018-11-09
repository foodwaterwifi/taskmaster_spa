defmodule Taskmaster3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :complete, :boolean, default: false
    field :description, :string
    field :time, :integer
    field :title, :string

    belongs_to :user, Taskmaster3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :time, :complete, :user_id])
    |> foreign_key_constraint(:user_id)
    |> validate_time()
    |> validate_required([:title, :description, :time, :complete, :user_id])
  end

  defp validate_time(changeset) do
    new_time = get_change(changeset, :time);
    if (new_time) do
      divisible = rem(new_time, 15) == 0
      positive = new_time >= 0
      cond do
        divisible && positive -> changeset
        divisible && not positive -> add_error(changeset, :time, "the time spent on a task must be positive")
        true -> add_error(changeset, :time, "the time spent on a task in minutes must be divisible by 15")
      end
    else
      changeset
    end
  end
end
