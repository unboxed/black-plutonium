define('fetch', (function () {
  var request = require('request'),
      config = require('config');

  return function (project, callback) {
    request('/projects/' + project + '/stories', success);

    function success (doc) {
      var node,
          issues = {},
          columns = config.states,
          state,
          results = doc.evaluate('/stories/story', doc, null, XPathResult.ANY_TYPE, null);

      for (var i = 0, l = columns.length; i < l; i++) {
        issues[columns[i]] = [];
      }

      while (node = results.iterateNext()) {
        state = getValue(node, 'current_state');

        if (issues[state]) {
          issues[state].push({
            name: getValue(node, 'name'),
            owned_by: getValue(node, 'owned_by initials'),
            estimate: getValue(node, 'estimate')
          });
        }
      }

      callback(issues);
    }
  };

  function getValue (node, name) {
    node = node.querySelector(name);

    return node ? node.textContent : '';
  }

}()));
