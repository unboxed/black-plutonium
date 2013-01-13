define('ColumnView', require('app').View.extend({
  tagName: 'section',
  className: 'column',
  template: require('tmpl')('column'),
  initialize: function () {
    this.settings = require('settings');
    this.model.on('update', this.render, this);
    this.on('render', function () {
      _.each(this.model.where({ state: this.options.state }), this.addOne, this);
    });
  },
  ItemView: require('IssueView'),
  addOne: function (model) {
    this.$el.find('ul').append(
      new this.ItemView({ model: model }).render().el
    );
  },
  presenter: function () {
    var items = this.model.where({ state: this.options.state }),
        labels = this.settings.getCurrentProjectLabels();

    return {
      state: this.options.state,
      issue_count: items.length,
      total_points: _.reduce(items, function (memo, m) {
        return memo + (Math.max(0, parseInt(m.get('estimate'), 10)) || 0);
      }, 0)
    };
  }
}));
