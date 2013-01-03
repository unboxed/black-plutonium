define('app', (function (Backbone, store) {
  Backbone.sync = function (method, model) {
    if ('read' == method) {
      model.set(
        JSON.parse(store.getItem(model.id)),
        {silent: true}
      );
    }

    if('update' == method) {
      store.setItem(
        this.id,
        JSON.stringify(model.toJSON())
      );
    }

    return this;
  };

  return {
    Model: Backbone.Model,
    Collection: Backbone.Collection,
    View: Backbone.View.extend({
      render: function () {
        this.el.innerHTML = Mustache.render(this.template, this.model.toJSON());
      
        return this;
      }
    })
  };

}(Backbone, window.localStorage)));
