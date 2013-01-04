define('ProjectListView', require('app').View.extend({
  template: require('tmpl')('projectList'),
  initialize: function () {
    this.model.on('update', this.render, this);
    this.settings = require('settings');
  },
  presenter: function () {
    var context = this.model.toJSON(),
        i = 0,
        l = context.length,
        labels,
        names = ['Arrow label', 'Square Label', 'Circle label'];

    for (; i < l; i++) {
      labels = this.settings.get('project_' + context[i].id) || [];
      context[i].labels = _.map(
        names,
        flatten
      );
    }

    return context;

    function flatten (name, i) {
      return { name: name, value: labels[i], slot: i };
    }
  }
}));
