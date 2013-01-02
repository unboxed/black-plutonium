define('columnView', (function () {
  var TEMPLATE = require('tmpl')('column'),
      div = document.createElement('div');
  
  return function (state, issues) {
    div.innerHTML = Mustache.render(TEMPLATE, { state: state, issues: issues });

    return {
      el: div.firstElementChild
    };
  };
}()));
