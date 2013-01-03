define('fetch', (function () {
  var request = require('request'),
      config = require('config');

  return function (callback) {
    request(success, error);

    function success (doc) {
      var node,
          issues = {},
          columns = config.states.concat(config.labels),
          column,
          state,
          labels,
          results = doc.evaluate('/stories/story', doc, null, XPathResult.ANY_TYPE, null);

      for (var i = 0, l = columns.length; i < l; i++) {
        issues[columns[i]] = [];
      }

      while (node = results.iterateNext()) {
        label = match(getValue(node, 'labels'), config.labels);
        state = match(getValue(node, 'current_state'), config.states);

        column = label ? label : state;

        if (column) {
          issues[column].push({
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

  function match (str, matchers) {
    var i = 0,
        l = matchers.length;

    for (; i < l; i++) {
      if (str.indexOf(matchers[i]) != -1) {
        return matchers[i];
      }
    }

    return null;
  }
}()));
