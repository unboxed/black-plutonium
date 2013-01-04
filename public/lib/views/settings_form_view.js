define('SettingsFormView', require('app').View.extend({
  template: require('tmpl')('settingsForm'),
  events: {
    "submit": "handleSave"
  },
  handleSave: function (e) {
    e.preventDefault();

    var data = {},
        domLabels = document.getElementById('settings').getElementsByClassName('label-field'),
        i = 0,
        domEl,
        name,
        l = domLabels.length;

    for (; i < l; i++) {
      domEl = domLabels[i];
      name = domEl.name;

      if(!data[name]) {
        data[name] = [];
      }

      data[name].push(domEl.value);
    }

    data.token = this.$el.find('[name=token]').val();
    this.model.set(data);

    this.model.save();
  }
}));
