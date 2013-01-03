define('ColumnView', require('app').View.extend({
  tagName: 'section',
  className: 'column',
  template: require('tmpl')('column'),
  initialize: function () {
    this.model.on('reset', this.render, this);
  },
  presenter: function () {
    var items = this.model.where({ state: this.options.state });

    return {
      state: this.options.state,
      issues: _(items).map(function (m) {
        return m.toJSON();
      }),
      issue_count: items.length,
      total_points: _.reduce(items, function (memo, m) {
        return memo + (parseInt(m.get('estimate'), 10) || 0);
      }, 0)
    };
  }
}));
