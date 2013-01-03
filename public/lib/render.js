define('render', (function () {
  var div = document.createElement('div'),
      tmpl = require('tmpl');

  return function (templateName, context) {
    div.innerHTML = Mustache.render(tmpl(templateName), context);

    return div.firstElementChild;
  };
}()));
