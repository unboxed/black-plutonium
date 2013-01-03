define('main', function () {
  var columnView = require('columnView'),
      config = require('config'),
      fetch = require('fetch');

  update();

  setInterval(update, config.refreshRate);

  function update () {
    fetch(handleFetch);
  }

  function handleFetch (issues) {
    var tasks = document.getElementById('tasks'),
        column;

    tasks.innerHTML = '';
    for (prop in issues) {
      column = columnView(prop, issues[prop]);
      tasks.appendChild(column.el);
    }
  }
});
