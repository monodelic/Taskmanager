class User < ApplicationRecord
  has_secure_password
<<<<<<< HEAD
=======

  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id

  validates :first_name, presence: true, length: { minimum: 2 }
  validates :last_name, presence: true , length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true, format: { with: /\A\S+@+\S+\z/,
    message: "wrong email" }
>>>>>>> belongs and validations
end
