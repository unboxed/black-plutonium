define('SettingsFormView', require('app').View.extend({
  template: require('tmpl')('settingsForm'),
  events: {
    "submit": "save"
  },
  save: function (e) {
    e.preventDefault();

    this.model.set('token', this.$el.find('[name=token]').val());
    if (window.location.hash) {
      this.model.setCurrentProjectLabels(
        _.map(this.$el.find('[name=label]'), function (el) { return el.value; })
      );
    }

    this.model.save();
  },
  presenter: function () {
    var context = this.model.toJSON(),
        labels;

    if (window.location.hash) {
      labels = this.model.getCurrentProjectLabels();
      context.labels = _.map(
        ['Arrow label', 'Square Label', 'Circle label'],
        function (name, i) {
          return { name: name, value: labels[i] };
        }
      );
    }

    return context;
  }
}));
