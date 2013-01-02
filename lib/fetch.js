define('fetch', function (callback) {
  require('request')([
    'unstarted',
    'finished',
    'delivered',
    'rejected'
  ], success, error);

  function success (doc) {
    var node,
        issues = {},
        state,
        results = doc.evaluate('/stories/story', doc, null, XPathResult.ANY_TYPE, null);

    while (node = results.iterateNext()) {
      state = getValue(node, 'current_state');
      if (!issues[state]) {
        issues[state] = [];
      }
      issues[state].push({
        name: getValue(node, 'name'),
        owned_by: getValue(node, 'owned_by initials')
      });
    }

    callback(issues);
  }

  function error () {
    alert("It seems we're having trouble getting a response from pivotal tracker.");
  }

  function getValue(node, name) {
    node = node.querySelector(name);

    return node ? node.textContent : '';
  }
});
