FactoryBot.define do
    factory :task do
      name { generate :string }
      description { generate :string }
      author_id { create(:user).id }
      assignee_id { create(:user).id }
    end
  end