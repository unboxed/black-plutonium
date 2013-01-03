define('settings', (function () {
  var app = require('app'),
      model = new app.Model({
        id: 'settings'
      });

  model.fetch();

  return model;
}()));
