var React = require('react');

var CommuteChart = module.exports = React.createClass({

  counter: 0,

  drawGraph: function(datax) {
    document.getElementById('intro').style.display = 'none';
    $('#allGraphsContainer').toggle();
    document.getElementById('hoodName').textContent = datax['Demographics:demographics'].response[0].region[0].neighborhood[0];
    document.getElementById('hoodIncome').textContent = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[0].data[0].attribute[0].values[0].neighborhood[0].value[0]._;
    var commuteDistribution = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[2].data[0].attribute;
    var dataArr = [];
    for (var i = 0; i < commuteDistribution.length; i++) {
      dataArr.push({
        name: commuteDistribution[i].name[0],
        val: Math.round(commuteDistribution[i].value[0]._ * 100)
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    var barHeight = 60;
    var canvas = d3.select('#commuteContainer')
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
      .attr('class', 'commuteBars')
      .attr('y', '25')
      .attr('width', function(d) {return (d.val * 2) + '%';})
      .attr('height', barHeight - 25);

    bars.append('text')
      .attr('class', 'commuteVal')
      .attr('font-family', 'ubuntu')
      .style('letter-spacing', '1px')
      .attr('x', function(d) { return ((d.val * 2) + .5) + '%'; })
      .attr('y', 42)
      .attr('dy', '.35em')
      .text(function(d) { return d.val + '%'; });

    bars.append('text')
      .attr('class', 'barValText')
      .attr('font-family', 'ubuntu')
      .style('letter-spacing', '1px')
      .attr('x', 0)
      .attr('y', barHeight / 2 - 5)
      .attr('dy', '0')
      .text(function(d) { return d.name; });

    this.counter += 1;
  },

  updateGraph: function(datax) {
    document.getElementById('hoodName').textContent = datax['Demographics:demographics'].response[0].region[0].neighborhood[0];
    document.getElementById('hoodIncome').textContent = 'Median income: $' + Math.round(datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[0].data[0].attribute[0].values[0].neighborhood[0].value[0]._);
    var commuteDistribution = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[2].data[0].attribute;
    var dataArr = [];
    for (var i = 0; i < commuteDistribution.length; i++) {
      dataArr.push({
        name: commuteDistribution[i].name[0],
        val: Math.round(commuteDistribution[i].value[0]._ * 100)
      });
    }
    var barHeight = 60;
    d3.transition()
      .each(function() {
        d3.selectAll('.commuteBars')
          .data(dataArr)
          .transition()
          .duration(400)
          .ease('linear')
          .attr('width', function(d) { return (d.val * 2) + '%'; });
        d3.selectAll('.commuteVal')
          .data(dataArr)
          .transition()
          .duration(400)
          .ease('linear')
          .attr('x', function(d) { return ((d.val * 2) + .5) + '%'; })
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
