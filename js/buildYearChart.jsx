var React = require('react');

var BuildYearChart = module.exports = React.createClass({

  counter: 0,

  drawGraph: function(datax) {
    document.getElementById('intro').style.display = 'none';
    var buildYearDistribution = datax['Demographics:demographics'].response[0].pages[0].page[1].tables[0].table[1].data[0].attribute;
    var dataArr = [];
    for (var i = 0; i < buildYearDistribution.length; i++) {
      dataArr.push({
        name: buildYearDistribution[i].name[0],
        val: Math.round(buildYearDistribution[i].value[0]._ * 100)
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var barHeight = 60;
    var canvas = d3.select('#buildYearContainer')
      .append('svg')
      .attr('id', 'commuteChart')
      .attr('class', 'graphs')
      .attr('width', 70 + '%')
      .attr('height', (60 * dataArr.length));

    var bars = canvas.selectAll()
      .data(dataArr)
      .enter()
      .append('g')
      .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

    bars.append('rect')
      .attr('class', 'buildYearBars')
      .attr('y', '25')
      .attr('width', function(d) {return (d.val) + '%';})
      .attr('height', barHeight - 25);

    bars.append('text')
      .attr('class', 'buildYearVal')
      .attr('x', function(d) { return ((d.val) + .5) + '%'; })
      .attr('y', 42)
      .attr('dy', '.35em')
      .text(function(d) { return d.val + '%'; });

    bars.append('text')
      .attr('class', 'buildYearValText')
      .attr('x', 0)
      .attr('y', barHeight / 2 - 5)
      .attr('dy', '0')
      .text(function(d) { return d.name; });

    this.counter += 1;
  },

  updateGraph: function(datax) {
    var buildYearDistribution = datax['Demographics:demographics'].response[0].pages[0].page[1].tables[0].table[1].data[0].attribute;
    var dataArr = [];
    for (var i = 0; i < buildYearDistribution.length; i++) {
      dataArr.push({
        name: buildYearDistribution[i].name[0],
        val: Math.round(buildYearDistribution[i].value[0]._ * 100)
      });
    }
    var barHeight = 60;
    d3.transition()
      .each(function() {
        d3.selectAll('.buildYearBars')
          .data(dataArr)
          .transition()
          .duration(400)
          .ease('linear')
          .attr('width', function(d) { return (d.val) + '%'; });
        d3.selectAll('.buildYearVal')
          .data(dataArr)
          .transition()
          .duration(400)
          .ease('linear')
          .attr('x', function(d) { return ((d.val) + .5) + '%'; })
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
      <article></article>
    );
  }
});
