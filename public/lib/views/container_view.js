define('ContainerView', require('app').View.extend({
  events: {
    'mouseenter header': 'showSettings',
    'mouseenter .column ul': 'hideSettings',
    'mouseleave': 'hideSettings'
  },
  initialize: function () {
    this.model.on('update', this.render, this);
  },
  render: function () {
    var self = this;
    // Push to the end of the execution stack
    setTimeout(function () {
      self.offset = self.$el.find('.settings-form').height();
    }, 0);
    return this;
  },
  hideSettings: function () {
    if (require('currentProject')()) {
      this.el.style[this.translateProp] = 'translate3d(0px, -' + this.offset + 'px, 0px)';
    }
  },
  showSettings: function () {
    this.el.style[this.translateProp] = 'translate3d(0px, 0px, 0px)';
  },
  translateProp: (function () {
    var div = document.createElement('div'),
        prefixes = ['transform', 'mozTransform', 'webkitTransform'],
        i = 0;

    for (; i < prefixes.length; i++) {
      if (div.style[prefixes[i]] !== undefined) {
        return prefixes[i];
      }
    }
  }())
}));
