define('tmpl', (function () {
  var templates;

  return function (name) {
    if (templates == undefined) {
      templates = collect();
    }

    return templates[name];
  };

  function collect () {
    var nodes = document.querySelectorAll('script[type="text/html"]'),
        i = 0,
        l = nodes.length,
        items = {};

    for(; i < l; i++) {
      items[nodes[i].getAttribute('data-name')] = nodes[i].textContent;
    }

    return items;
  }
}()));
