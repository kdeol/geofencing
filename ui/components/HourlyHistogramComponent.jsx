import React, {Component} from 'react';

var histogramStyle = {
  width:"460px",
  height:"300px"
};

/**
 * d3.js chart to display number of trips by hour
 */
export default class HourlyHistogramComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate () {
    var hourArr = new Array(24);
    for(var i=0; i< hourArr.length; i++) {
      hourArr[i] = {hour: i, count: 0};
    }

    this.props.trips.forEach((trip) => {
      var hour = moment(trip.timestamp).hour();
      hourArr[hour].count += 1;
    });

    var el = d3.select("#histogram");
    el.selectAll("*").remove();
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 460 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

    var x = d3.scaleLinear().range([0, width/24]);
    var y = d3.scaleLinear().range([height, 0]);

    var xAxis = d3.axisBottom(x).ticks(24);

    var yAxis = d3.axisLeft(y)
      .ticks(10);

    var svg = el.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    x.domain(hourArr.map(function(data) { return data.hour }));
    y.domain([0, d3.max(hourArr, function (data) { return data.count;})]);

    svg.append("text")
      .attr("x", width/2)
      .style("text-decoration", "underline")
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")
      .text("Trip Count by Hour of Day");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .text("Hour");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Count");

    svg.selectAll("bar")
      .data(hourArr)
      .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function (d) {return x(d.hour); })
      .attr("width", width/24)
      .attr("y", function(d) { return y(d.count); })
      .attr("height", function(d) { return height - y(d.count); });

  }

  render() {
    return <div id="histogram" style={histogramStyle}></div>
  }
}