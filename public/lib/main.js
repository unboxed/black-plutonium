define('main', function () {
  var config = require('config'),
      render = require('render'),
      app = require('app'),
      SettingsFormView = require('SettingsFormView'),
      settings = require('settings'),
      ProjectCollection = require('ProjectCollection'),
      ProjectListView = require('ProjectListView'),
      ContainerView = require('ContainerView'),
      projects = new ProjectCollection(),
      fetch = require('fetch'),
      containerView = new ContainerView({
        el: '#container'
      });

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
  projects.on('reset', containerView.render, containerView);
  
  setInterval(updateStories, config.refreshRate);

  window.addEventListener('hashchange', updateStories);

  function updateStories () {
    if (window.location.hash && settings.get('token')) {
      fetch(window.location.hash.substr(2), handleFetch);
    }
  }

  function updateProjects () {
    if (settings.get('token')) {
      projects.fetch();
    }
  }

  function handleFetch (issues) {
    // TODO make columns Backbone views
    var tasks = document.getElementById('tasks'),
        el;

    tasks.innerHTML = '';
    for (state in issues) {
      el = render('column', { state: state, issues: issues[state] });
      tasks.appendChild(el);
    }
  }
});
