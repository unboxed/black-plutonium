define('main', function () {
  var config = require('config'),
      app = require('app'),
      SettingsFormView = require('SettingsFormView'),
      settings = require('settings'),
      ProjectCollection = require('ProjectCollection'),
      ProjectListView = require('ProjectListView'),
      ContainerView = require('ContainerView'),
      ColumnView = require('ColumnView'),
      StoryCollection = require('StoryCollection'),
      stories = new StoryCollection(),
      projects = new ProjectCollection(),
      containerView = new ContainerView({
        el: '#container',
        model: projects
      }),
      domTasks = document.getElementById('tasks');

  for (var i = 0, l = config.states.length; i < l; i++) {
    domTasks.appendChild(
      new ColumnView({
        state: config.states[i],
        model: stories
      }).el
    );
  }

  updateStories();
  updateProjects();

  new SettingsFormView({
    el: '#settings-form',
    model: settings
  }).render();

  new ProjectListView({
    el: '#project-list',
    model: projects
  });

  settings.on('change:token', updateProjects);
  settings.on('change:token', updateStories);

  setInterval(updateStories, config.refreshRate);

  window.addEventListener('hashchange', updateStories);

  function updateStories () {
    if (window.location.hash && settings.get('token')) {
      stories.fetch();
    }
  }

  function updateProjects () {
    if (settings.get('token')) {
      projects.fetch();
    }
  }
});
