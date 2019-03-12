class Task < ApplicationRecord
	belongs_to :author, class_name: 'User'
	belongs_to :assignee, class_name: 'User', optional: true

	validates :name, presence: true
	validates :description, presence: true
	validates :author, presence: true
	validates :description, length: { maximum: 500 } 

	state_machine :initial => :new do

		event :development do
			transition :new => :in_development
		end
	
	    event :finish_develop do
	      	transition :in_development => :in_qa
	    end

	    event :to_codereview do
	    	transition :in_qa => :in_codereview
	    end	

	    event :back_to_development do
	    	transition :in_qa => :in_development
	    end	
	
	    event :finish_review do
	      	transition :in_codereview => :ready_for_release
	    end
	
	    event :release do
	      	transition :ready_for_release => :released
	    end
	
	    event :archiving do
	      	transition [:new, :released] => :archived
		end
	end
end