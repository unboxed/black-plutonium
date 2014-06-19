define('ColumnView', require('app').View.extend({
  tagName: 'section',
  className: 'column',
  template: require('tmpl')('column'),
  initialize: function () {
    this.items = [];
    this.settings = require('settings');

    this.model.on('beforeupdate', this.beforeUpdate, this);
    this.model.on('update', this.render, this);
    this.on('render', this.afterRender);
  },
  ItemView: require('IssueView'),
  addOne: function (model) {
    var item = new this.ItemView({ model: model }).render();

    return item;
  },
  presenter: function () {
    var items = this.model.byState(this.options.state.states),
        labels = this.settings.getCurrentProjectLabels();

    return {
      state_name: this.options.state.name,
      issue_count: items.length,
      total_points: _.reduce(items, function (memo, m) {
        return memo + (Math.max(0, parseInt(m.get('estimate'), 10)) || 0);
      }, 0)
    };
  },
  beforeUpdate: function () {
    _.invoke(this.items, 'storePosition', 'original');
  },
  afterRender: function () {
    var issues = this.model.byState(this.options.state.states),
        items = this.items = _.map(issues, this.addOne, this);

    this.$el.find('ul').html(_(items).pluck('el'));

    _.invoke(items, 'storePosition', 'current');
    _.invoke(items, 'reposition');

    setTimeout(function () {
      _.invoke(items, 'resetPosition');
    }, 1000);
  }
}));
