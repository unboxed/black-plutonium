black-plutonium
===============

Do not use webrick in development as the call to the PivotalTracker api proxy may not work. Instead use puma. ie
 rails s puma

Any call to /services is routed to https://www.pivotaltracker.com. See config/initailizers/proxy.rb

Or...

  bundle exec rackup config.norails.ru
  
To avoid rails and just use rack (admittedly, this will end up serving the entire app directory, we might need to move things around).