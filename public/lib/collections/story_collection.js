define('StoryCollection', require('app').Collection.extend({
  attributeMap: {
    id: 'id',
    name: 'name',
    state: 'current_state',
    owned_by: 'owned_by initials',
    estimate: 'estimate',
    story_type: 'story_type'
  },
  url: function () {
    return '/projects/' + window.location.hash.substr(2) + '/iterations/current_backlog';
  },
  rootQuery: '/iterations/iteration/stories/story'
}));
