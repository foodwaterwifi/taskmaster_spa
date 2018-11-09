# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Taskmaster3.Repo.insert!(%Taskmaster3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Taskmaster3.Repo
alias Taskmaster3.Users.User
alias Taskmaster3.Tasks.Task

testpwhash = Argon2.hash_pwd_salt("test")
adminpwhash = Argon2.hash_pwd_salt("admin")

Repo.insert!(%User{username: "nyaruko", admin: true, password_hash: adminpwhash})
Repo.insert!(%User{username: "cthuko", admin: false, password_hash: testpwhash})
Repo.insert!(%User{username: "mahiro", admin: false, password_hash: testpwhash})

Repo.insert!(%Task{title: "world domination", description: "uu~ nyaa~", time: 600, complete: false, user_id: 1})
Repo.insert!(%Task{title: "buy game", description: "dino quest 2 comes out today", time: 0, complete: false, user_id: 2})
Repo.insert!(%Task{title: "chores", description: "dishes and cleaning", time: 45, complete: true, user_id: 3})
