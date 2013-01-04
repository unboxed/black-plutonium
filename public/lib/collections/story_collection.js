define('StoryCollection', require('app').Collection.extend({
  attributeMap: {
    id: 'id',
    name: 'name',
    state: 'current_state',
    owned_by: 'owned_by initials',
    estimate: 'estimate',
    story_type: 'story_type',
    accepted_at: 'accepted_at'
  },
  model : require('app').Model.extend({
    accepted_date : function () {
      var d = Date.parse(this.get('accepted_at'));
      if (isNaN(d)) {
        return null;
      } else {
        return new Date(d);
      }
    },
    isAccepted : function () {
      return (this.get('state') === 'accepted');
    },
  }),
  url: function () {
    return '/projects/' + window.location.hash.substr(2) + '/iterations/current';
  },
  rootQuery: '/iterations/iteration/stories/story'
}));
