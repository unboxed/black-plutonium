black-plutonium
===============

A pivotal tracker taskboard.

To run:

    bundle exec rackup


Visit:

    http://localhost:9292

Give it your [Pivotal Tracker API key](http://community.pivotaltracker.com/pivotal/topics/api_key-c7isv) and choose one of your projects to display.  

You are presented with a standard agile taskboard for the current iteration.  Each column shows the stories in a given state, in order from left-to-right: unstarted, started, finished, delivered, rejected, accepted.  Overlayed on the taskboard are two lines representing burn up for the iteration: red is the ideal, green is the actual.

You can configure up to 3 icons for each project.  Fill in the label that you want the icon to represent, and any story in your project with that label will be highlighted with the icon.  For example, we label stories we can't work on as "blocked", so we always have an icon to highlight those stories.

NOTE: The server component is required to allow us to route AJAX requests through to the pivotal API.  It's pretty simple; any call to /services is routed to https://www.pivotaltracker.com/services.  See lib/pivotal_proxy.rb for more detail.
