define('config', {
  base_url: '/services/v4',
  states: [{name: 'unstarted', states: ['unstarted', 'planned']},
           {name: 'started', states: ['started']},
           {name: 'finished', states: ['finished']},
           {name: 'delivered', states: ['rejected']},
           {name: 'accepted', states: ['accepted']}],
  refreshRate: 3e4
});
