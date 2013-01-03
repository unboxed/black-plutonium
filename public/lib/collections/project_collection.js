define('ProjectCollection', require('app').Collection.extend({
  attributeMap: {
    id: 'id',
    name: 'name'
  },
  url: function () {
    return '/projects';
  },
  rootQuery: '/projects/project'
}));
