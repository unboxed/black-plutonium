define('app', (function (Backbone, store) {
  var request = require('request'),
      utils = require('utils');

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
    Collection: Backbone.Collection.extend({
      url: '/',
      rootQuery: '/',
      attributeMap: {
        id: 'id',
        name: 'name'
      },
      fetch: function () {
        var self = this;
        request(this.url(), function (doc) {
          var results = doc.evaluate(self.rootQuery, doc, null, XPathResult.ANY_TYPE, null),
              node,
              attr,
              item,
              mapper,
              map = self.attributeMap,
              items = [];

          while (node = results.iterateNext()) {
            item = {};
            for (attr in map) {
              if (map.hasOwnProperty(attr)) {
                mapper = map[attr];
                if (mapper instanceof Array) {
                  item[attr] = mapper[1](utils.getValueFromXML(node, mapper[0]));
                } else {
                  item[attr] = utils.getValueFromXML(node, mapper);
                }
              }
            }
            items.push(item);
          }
          item = null;
          self.update(items);
          self.trigger('document-retrieved', doc);
        });
      },
      update: function (data) {
        this.trigger('beforeupdate');
        Backbone.Collection.prototype.update.call(this, data);
        this.trigger('update');
        return this;
      }
    }),
    View: Backbone.View.extend({
      presenter: function () {
        return this.model.toJSON();
      },
      render: function () {
        this.trigger('beforerender');
        this.el.innerHTML = Mustache.render(this.template, this.presenter());
        this.trigger('render');

        return this;
      }
    })
  };

  function getValue (node, name) {
    node = node.querySelector(name);

    return node ? node.textContent : '';
  }

}(Backbone, window.localStorage)));
