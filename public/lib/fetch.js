define('fetch', (function () {
  var request = require('request'),
      config = require('config');

  return function (callback) {
    request(success, error);

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

        if (state) {
          issues[state].push({
            name: getValue(node, 'name'),
            owned_by: getValue(node, 'owned_by initials')
          });
        }
      }

      callback(issues);
    }
  };

  function error () {
    alert("It seems we're having trouble getting a response from pivotal tracker.");
  }

  function getValue (node, name) {
    node = node.querySelector(name);

    return node ? node.textContent : '';
  }

}()));
