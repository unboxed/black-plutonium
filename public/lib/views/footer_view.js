define('FooterView', require('app').View.extend({
  initialize: function () {
    this.model.on('change', this.render, this);
  },
  template: require('tmpl')('footer'),
  presenter: function () {
    var project = this.model.get('project');
    return {
      project: project ? project.toJSON() : false
    };
  }
}));
