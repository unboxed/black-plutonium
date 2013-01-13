define('main', function () {
  var config = require('config'),
      app = require('app'),
      utils = require('utils'),
      AccountSettingsView = require('AccountSettingsView'),
      SettingsFormView = require('SettingsFormView'),
      settings = require('settings'),
      ProjectCollection = require('ProjectCollection'),
      ProjectListView = require('ProjectListView'),
      ContainerView = require('ContainerView'),
      ColumnView = require('ColumnView'),
      BurnChartView = require('BurnChartView'),
      StoryCollection = require('StoryCollection'),
      FooterView = require('FooterView'),
      stories = new StoryCollection(),
      projects = new ProjectCollection(),
      BurnChart = require('BurnChart'),
      burnChart = new BurnChart(),
      footer = new app.Model(),
      containerView = new ContainerView({
        el: '#container',
        model: projects
      }),
      settingsForm = new SettingsFormView({
        el: '#settings-form',
        model: settings
      }),
      projectList = new ProjectListView({
        el: '#project-list',
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

  new AccountSettingsView({
    el: '#account-settings',
    model: settings
  }).render();

  new FooterView({
    el: '#footer',
    model: footer
  });

  new BurnChartView({
    el: '#burn-chart',
    model: burnChart
  });

  settings.on('change:token', updateProjects);
  settings.on('change', updateStories);
  projects.on('update', setActiveProject);
  window.addEventListener('hashchange', updateStories);

  setInterval(updateStories, config.refreshRate);

  stories.on('document-retrieved', function(doc) {
    burnChart.update(doc, this);
  });

  function updateStories () {
    if (window.location.hash && settings.get('token')) {
      stories.fetch();
      setActiveProject();
    }
  }

  function updateProjects () {
    if (settings.get('token')) {
      projects.fetch();
    }
  }

  function setActiveProject () {
    footer.set('project', projects.get(window.location.hash.substr(2)));
    projectList.render();
  }
});
