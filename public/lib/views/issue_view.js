define('IssueView', require('app').View.extend({
  tagName: 'li',
  template: require('tmpl')('issue'),
  initialize: function () {
    this.settings = require('settings');
    this.on('render', this.afterRender);
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
  },
  reposition: function () {
    var current = this.model.get('current') || { left: 0, top: 0 },
        original = this.model.get('original') || { left: -screen.width, top: 0},
        left = original.left - current.left,
        top = original.top - current.top;

    this.$el
      .addClass(this.model.get('story_type'))
      .css({
        'webkitTransform': 'translate3d(' + left + 'px, ' + top + 'px, 0)',
        'webkitTransition': 'none'
      });
  },
  storePosition: function (key) {
    this.model.set(key, this.$el.position());
  },
  resetPosition: function () {
    this.$el.css({
      'webkitTransform': 'translate3d(0, 0, 0)',
      'webkitTransition': '-webkit-transform 0.5s ease-out'
    });
  }
}));
