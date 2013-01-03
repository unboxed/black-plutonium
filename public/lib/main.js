define('main', function () {
  var config = require('config'),
      render = require('render'),
      app = require('app'),
      SettingsFormView = require('SettingsFormView'),
      settings = require('settings'),
      fetch = require('fetch');

  update();

  new SettingsFormView({
    el: '#settings-form',
    model: settings
  }).render();

  settings.on('change:token', update);
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
