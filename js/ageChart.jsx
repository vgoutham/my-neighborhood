var React = require('react');

var AgeDonut = module.exports = React.createClass({

  drawGraph: function(datax) {

    var nameDemographics = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[1].data[0].attribute;

    var data = [];
    for (var i = 0; i < nameDemographics.length; i++) {
      data.push({
        name: nameDemographics[i].name[0],
        val: Math.round(nameDemographics[i].value[0]._ * 100)
      });
    }

    var width = 400,
        height = 300,
        radius = 250;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 120)
        .innerRadius(radius - 190);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.val; });

    var svg = d3.select("#ageChart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    data.forEach(function(d) {
      d.val = +d.val;
    });

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.name); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.name; });
  },
  render: function() {
    if (this.props.info) {
      this.drawGraph(this.props.info);
    }
    return(
      <article id='ageChart'></article>
    );
  }
});
