define('BurnChartView', require('app').View.extend({
  initialize : function () {
    this.model.on('update', this.render, this);
  },
  render : function () {
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.time.scale().range([0, width]);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var line = d3.svg.line().x(function(d) { return x(d[0]); }).y(function(d) { return y(d[1]); });

    d3.select(this.el).select('svg').remove();
    var svg = d3.select(this.el).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var actual_data = _.zip(this.model.x_axis(), this.model.actual());
    var ideal_data = [[this.model.start_date(), 0], [this.model.end_date(), this.model.total_commitment]];

    x.domain(d3.extent(actual_data, function(d) { return d[0]; }));
    y.domain(d3.extent([0, this.model.total_commitment]));

    svg.append("path").datum(actual_data).attr("class", "actual line").attr("d", line);
    svg.append("path").datum(ideal_data).attr('class', 'ideal line').attr('d', line);
  }
}));
