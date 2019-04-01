# frozen_string_literal: true

ActiveRecord::Schema.define(version: 20_190_311_135_549) do
  enable_extension 'plpgsql'

  create_table 'tasks', force: :cascade do |t|
    t.string 'name'
    t.text 'description'
    t.integer 'author_id'
    t.integer 'assignee_id'
    t.string 'state'
    t.date 'expired_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'users', force: :cascade do |t|
    t.string 'first_name'
    t.string 'last_name'
    t.string 'password_digest'
    t.string 'email'
    t.string 'avatar'
    t.string 'type'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end
end
