define('FooterView', require('app').View.extend({
  initialize: function () {
    var settings = this.settings = require('settings');
    this.model.on('change', this.render, this);
    settings.on('change', this.render, this);
  },
  template: require('tmpl')('footer'),
  presenter: function () {
    var project = this.model.get('project');
    return {
      legend: _.map(this.settings.getCurrentProjectLabels(), function (value, i) {
        return {
          slot: i,
          value: value
        };
      }),
      project: project ? project.toJSON() : false
    };
  }
}));
