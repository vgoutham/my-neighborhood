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

    var width = 300,
        height = 300,
        radius = 250;

    var color = d3.scale.category20();

    var arc = d3.svg.arc()
        .outerRadius(radius - 120)
        .innerRadius(radius - 190);

    var arcOver = d3.svg.arc()
        .innerRadius(radius - 190)
        .outerRadius(radius - 100);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.val; });

    var svg = d3.select("#sidebar").append("svg")
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
        .style("fill", function(d) { return color(d.data.name); })
        .on("mouseover", function(d) {
          d3.select(this).transition()
            .duration(500)
            .attr("d", arcOver);
        })
        .on("mouseout", function(d) {
          d3.select(this).transition()
            .duration(500)
            .attr("d", arc);
        });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.name; });

    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 0)
      .attr("fill", "#fff")
    svg.append("text")
      .attr("dy", "-0.5em")
      .style("text-anchor", "middle")
      .attr("class", "inner-circle")
      //.attr("fill", "#36454f")
      .text(function(d) { return 'Age Distribution'; });

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
