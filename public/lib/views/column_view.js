define('ColumnView', require('app').View.extend({
  tagName: 'section',
  className: 'column',
  template: require('tmpl')('column'),
  initialize: function () {
    this.settings = require('settings');
    this.model.on('update', this.render, this);
  },
  presenter: function () {
    var items = this.model.where({ state: this.options.state }),
        labels = this.settings.getCurrentProjectLabels();

    return {
      state: this.options.state,
      issues: _(items).map(function (m) {
        var context = m.toJSON(),
            match =[],
            i = 0,
            slot,
            l = context.labels.length;

        for(; i < l; i++) {
          slot = labels.indexOf(context.labels[i]);
          if (slot != -1) {
            match.push({
              slot: slot,
              value: context.labels[i]
            });
          }
        }
        context.matched_labels = match;
        
        return context;
      }),
      issue_count: items.length,
      total_points: _.reduce(items, function (memo, m) {
        return memo + (Math.max(0, parseInt(m.get('estimate'), 10)) || 0);
      }, 0)
    };
  }
}));
