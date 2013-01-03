define('ProjectListView', require('app').View.extend({
  template: require('tmpl')('projectList'),
  initialize: function () {
    this.model.on('update', this.render, this);
  }
}));
