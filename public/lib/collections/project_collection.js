define('ProjectCollection', (function () {
  var request = require('request'),
      collection = require('app').Collection.extend({
        fetch: function () {
          var self = this;
          request('/projects', function (doc) {
            var results = doc.evaluate('/projects/project', doc, null, XPathResult.ANY_TYPE, null),
                node,
                projects = [];

            while (node = results.iterateNext()) {
              projects.push({
                id: getValue(node, 'id'),
                name: getValue(node, 'name')
              });
            }

            self.reset(projects);
          });
        }
      });

  function getValue (node, name) {
    node = node.querySelector(name);

    return node ? node.textContent : '';
  }

  return collection;
}()));
