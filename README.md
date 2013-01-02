black-plutonium
===============

Do not use webrick in development as the call to the PivotalTracker api proxy may not work. Instead use puma. ie
 rails s puma

Any call to /services is routed to https://www.pivotaltracker.com. See config/initailizers/proxy.rb