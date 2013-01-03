define('main', function () {
  var render = require('render'),
      config = require('config'),
      fetch = require('fetch');

  update();

  setInterval(update, config.refreshRate);

  function update () {
    fetch(handleFetch);
  }

  function handleFetch (issues) {
    var tasks = document.getElementById('tasks'),
        el;

    tasks.innerHTML = '';
    for (state in issues) {
      el = render('column', { state: state, issues: issues[state] });
      tasks.appendChild(el);
    }
  }
});
