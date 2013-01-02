define('fetch', function (callback) {
  require('request')([
    'unstarted',
    'finished',
    'delivered',
    'rejected'
  ], success);

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
  }
});
