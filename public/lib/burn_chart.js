define('BurnChart', require('app').Model.extend({
  start_date_timestamp : null,
  end_date_timestamp : null,
  total_commitment : 0,
  stories : null,

  start_date : function () {
    return new Date(Date.parse(this.start_date_timestamp));
  },

  end_date : function () {
    return new Date(Date.parse(this.end_date_timestamp));
  },

  fetchStartAndEndDates : function (doc) {
    var utils = require('utils'),
        iteration_result = doc.evaluate('iterations/iteration', doc, null, XPathResult.ANY_TYPE, null);
    if (node = iteration_result.iterateNext()) {
      this.start_date_timestamp = utils.getValueFromXML(node, 'start');
      this.end_date_timestamp = utils.getValueFromXML(node, 'finish');
    }
  },

  fetchTotalCommitment : function (story_collection) {
    this.stories = story_collection;
    this.total_commitment = this.stories.reduce(function (memo, m) {
      return memo + (Math.max(0, parseInt(m.get('estimate'), 10)) || 0);
    }, 0);
  },

  toString : function () {
    return "Start: [" + this.start_date() + "], End: [" + this.end_date() + "], Commitment: [" + this.total_commitment + "], X Axis: [" + this.x_axis() + "], Data: ["+this.actual()+"]"
  },

  update : function (doc, story_collection) {
    this.fetchStartAndEndDates(doc);
    this.fetchTotalCommitment(story_collection);
    this.trigger('update');
  },

  x_axis : function (stop_on_date) {
    var x_axis = new Array(),
        x = new Date(this.start_date()),
        terminator = this.end_date();
    if ((stop_on_date !== undefined) && (stop_on_date < terminator)) {
      terminator = stop_on_date;
    }
    while (x <= terminator) {
      x_axis.push( new Date (x) )
      x.setDate(x.getDate() + 1);
    }
    return x_axis;
  },

  storyPointsOnDay : function (day) {
    return this.stories.reduce( function (points, story) {
      if (story.isAccepted() && story.accepted_date() <= day) {
        return points + (Math.max(0, parseInt(story.get('estimate'), 10)) || 0);
      } else {
        return points;
      }
    }, 0);
  },

  ideal : function () {
    [0, this.total_commitment];
  },

  actual : function () {
    var me = this;
    return _.map(this.x_axis(new Date), function (x) {
      return me.storyPointsOnDay(x);
    });
  },

}));