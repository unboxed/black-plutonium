define('ContainerView', require('app').View.extend({
  events: {
    'mouseenter h1': 'showSettings',
    'mouseenter .column ul': 'hideSettings',
    'mouseleave': 'hideSettings'
  },
  render: function () {
    this.offset = this.$el.find('.settings').height();

    return this;
  },
  hideSettings: function () {
    this.el.style[this.translateProp] = 'translate3d(0px, -' + this.offset + 'px, 0px)';
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
