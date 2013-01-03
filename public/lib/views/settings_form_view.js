define('SettingsFormView', require('app').View.extend({
  template: require('tmpl')('settingsForm'),
  events: {
    "submit": "save"
  },
  save: function (e) {
    e.preventDefault();

    this.model.set('token', this.$el.find('[name=token]').val());
    this.model.save();
  }
}));
