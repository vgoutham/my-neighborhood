var React = require('react');

var MedianChart = module.exports = React.createClass({

  counter: 0,

  drawGraph: function(datax) {
    var ageDistribution = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[2].data[0].attribute;
    var dataArr = [];
    for (var i = 0; i < ageDistribution.length; i++) {
      dataArr.push({
        name: ageDistribution[i].name[0],
        val: Math.round(ageDistribution[i].value[0]._ * 100)
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var barHeight = 50;
    var canvas = d3.select('#sidebar')
      .append('svg')
      .attr('class', 'graphs')
      .attr('width', 80 + '%')
      .attr('height', (40 * dataArr.length) + 80);

    var bars = canvas.selectAll('g')
      .data(dataArr)
      .enter()
      .append('g')
      .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

    bars.append('rect')
      .attr('class', 'medianAgeBars')
      .attr('width', function(d) {return d.val + '%';})
      .attr('height', barHeight - 10);

    bars.append('text')
      .attr('class', 'locVal')
      .attr('x', function(d) { return (d.val + .5) + '%'; })
      .attr('y', barHeight / 2 - 5)
      .attr('dy', '.35em')
      .text(function(d) { return d.val + '%'; });

    bars.append('text')
      .attr('x', 0)
      .attr('y', barHeight / 2 - 5)
      .attr('dy', '.35em')
      .text(function(d) { return d.name; });

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
    var barHeight = 50;
    d3.transition()
      .each(function() {
        d3.selectAll('.medianAgeBars')
          .data(dataArr)
          .transition()
          .duration(400)
          .ease('linear')
          .attr('width', function(d) { return d.val + '%'; });
        d3.selectAll('.locVal')
          .data(dataArr)
          .transition()
          .duration(400)
          .ease('linear')
          .attr('x', function(d) { return (d.val + .5) + '%'; })
          .attr('y', barHeight / 2 - 5)
          .attr('dy', '.35em')
          .text(function(d) { return d.val + '%'; });
      });
  },
  render: function() {
    if (this.props.info && this.counter == 0) {
      this.drawGraph(this.props.info);
    }
    if (this.props.info && this.counter > 0) {
      this.updateGraph(this.props.info);
    }
		return (
      <article id='medianChart'></article>
    );
  }
});

