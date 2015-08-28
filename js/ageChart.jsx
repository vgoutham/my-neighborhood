var React = require('react');

var AgeDonut = module.exports = React.createClass({

  counter: 0,

  drawGraph: function(datax) {

    var ageDistribution = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[1].data[0].attribute;

    var dataArr = [];
    for (var i = 0; i < ageDistribution.length; i++) {
      dataArr.push({
        name: ageDistribution[i].name[0],
        val: Math.round(ageDistribution[i].value[0]._ * 100)
      });
    }

    var width = 300;
    var height = 300;
    var radius = 280;

    var color = d3.scale.category20();

    var arc = d3.svg.arc()
      .innerRadius(radius - 210)
      .outerRadius(radius - 120);

    var arcOver = d3.svg.arc()
      .innerRadius(radius - 210)
      .outerRadius(radius - 100);

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.val; });

    var svg = d3.select('#ageContainer')
      .append('svg')
      .attr('id', 'ageChart')
      .attr('class', 'graphs')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var g = svg.selectAll('.arc')
      .data(pie(dataArr))
      .enter()
      .append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .attr('class', 'ageArcs')
      .style('fill', function(d) { return color(d.data.name); })
      .on('mouseover', function(d) {
        d3.select(this).transition()
          .duration(500)
          .attr('d', arcOver);
      })
      .on('mouseout', function(d) {
        d3.select(this).transition()
          .duration(500)
          .attr('d', arc);
      });

    g.append('text')
      .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text(function(d) { return d.data.name + ', ' + d.data.val + '%'; });
/*
    svg.append('text')
      .attr('dy', '0')
      .style('text-anchor', 'middle')
      .attr('class', 'inner-circle')
      .text(function(d) { return 'Age Distribution'; });
*/
    this.counter += 1;
  },

  updateGraph: function(datax) {
    var ageDistribution = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[1].data[0].attribute;
    var dataArr = [];
    for (var i = 0; i < ageDistribution.length; i++) {
      dataArr.push({
        name: ageDistribution[i].name[0],
        val: Math.round(ageDistribution[i].value[0]._ * 100)
      });
    }

    var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.val; });

    d3.transition()
      .each(function() {
        d3.selectAll('.arc')
          .data(pie(dataArr))
          .transition()
          .duration(400)
          .ease('linear')
        });
  },

  render: function() {
    if (this.props.info && this.counter == 0) {
      this.drawGraph(this.props.info);
    }
    if (this.props.info && this.counter > 0) {
      this.updateGraph(this.props.info);
    }
    return(
      <article></article>
    );
  }
});
