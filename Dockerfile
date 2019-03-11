FROM ruby:2.5.3 

RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -

RUN apt-get install -y nodejs

RUN mkdir -p /task_manager 
WORKDIR /task_manager 
COPY Gemfile Gemfile.lock ./ 
RUN bundle install --jobs 3
COPY . /task_manager 

EXPOSE 3000 
CMD bundle exec rails s -b 0.0.0.0 -p 3000
