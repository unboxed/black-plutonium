define('AccountSettingsView', require('app').View.extend({
  initialize: function () {
    this.model.on('change', this.render, this);
  },
  template: require('tmpl')('accountSettings')
}));
