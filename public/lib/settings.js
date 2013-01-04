define('settings', (function () {
  var Model = new require('app').Model.extend({
        getCurrentProjectLabels: function () {
          return this.get('project_' + window.location.hash.substr(2)) || [];
        }
      }),
      model = new Model({
        id: 'settings'
      });

  model.fetch();

  return model;
}()));
