define('main', function () {
  var config = require('config'),
      render = require('render'),
      app = require('app'),
      SettingsFormView = require('SettingsFormView'),
      settings = require('settings'),
      ProjectCollection = require('ProjectCollection'),
      ProjectListView = require('ProjectListView'),
      projects = new ProjectCollection(),
      fetch = require('fetch');

  update();

  new SettingsFormView({
    el: '#settings-form',
    model: settings
  }).render();

  new ProjectListView({
    el: '#project-list',
    model: projects
  });

  settings.on('change:token', projects.fetch, projects);
  settings.on('change:token', update);
  
  projects.fetch();

  setInterval(update, config.refreshRate);

  function update () {
    fetch(handleFetch);
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
