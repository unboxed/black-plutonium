define('ProjectListView', require('app').View.extend({
  template: require('tmpl')('projectList'),
  initialize: function () {
    this.model.on('reset', this.render, this);
  }
}));
