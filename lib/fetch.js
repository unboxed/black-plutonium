define('fetch', function (callback) {
  require('request')([
    'unstarted',
    'finished',
    'delivered',
    'rejected'
  ], success, error);

  function success (doc) {
    var node,
        items = {},
        state,
        results = doc.evaluate('/stories/story', doc, null, XPathResult.ANY_TYPE, null);

    while (node = results.iterateNext()) {
      state = node.getElementsByTagName('current_state')[0].textContent;
      if (!items[state]) {
        items[state] = [];
      }
      items[state].push(node.getElementsByTagName('name')[0].textContent);
    }

    callback(items);
  function error () {
    alert("It seems we're having trouble getting a response from pivotal tracker.");
  }

  }
});
