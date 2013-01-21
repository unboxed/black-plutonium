define('settings', (function () {
  var currentProject = require('currentProject'),
      Model = new require('app').Model.extend({
        getCurrentProjectLabels: function () {
          return this.get('project_' + currentProject()) || [];
        }
      }),
      model = new Model({
        id: 'settings'
      });

  model.fetch();

  return model;
}()));
