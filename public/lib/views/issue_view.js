define('IssueView', require('app').View.extend({
  template: require('tmpl')('issue'),
  initialize: function () {
    this.settings = require('settings');
  },
  presenter: function () {
    var context = this.model.toJSON(),
        labels = this.settings.getCurrentProjectLabels(),
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
  }
}));
