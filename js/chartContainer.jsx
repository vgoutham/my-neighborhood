var React = require('react');

var ChartContainer = module.exports = React.createClass({




  drawGraph: function(datax) {
        console.log('draw graph invoked!!!!!');
        
        /*var ageDistribution = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[1].data[0].attribute;
        //console.log(ageDistribution);
        var dataArr = [];
        for (var i = 0; i < ageDistribution.length; i++) {
          dataArr.push({
            name: ageDistribution[i].name[0],
            val: Math.round(ageDistribution[i].value[0]._ * 100)
          });
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////
        //draw initial canvas
        var barHeight = 50;
        var canvas = d3.select('#chartHere')
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
          .text(function(d) { return d.name; });*/
        ////////////////////////////////////////////////////////////////////////////////////////////////

        //update canvas with new random data
        // function newData() {
        //   for (var i = 0; i < dataArr.length; i++) {
        //     dataArr[i].val = Math.floor(Math.random() * 50);
        //   }
        //   d3.transition()
        //     .each(function() {
        //       d3.selectAll('rect')
        //         .data(dataArr)
        //         .transition()
        //         .duration(400)
        //         .ease('linear')
        //         .attr('width', function(d) { return d.val + '%'; });
        //       d3.selectAll('.locVal')
        //         .data(dataArr)
        //         .transition()
        //         .duration(400)
        //         .ease('linear')
        //         .attr('x', function(d) { return (d.val + .5) + '%'; })
        //         .attr('y', barHeight / 2 - 5)
        //         .attr('dy', '.35em')
        //         .text(function(d) { return d.val + '%'; });
        //     });
        //   }
  },





  // thing: function() {
  //   console.log('child thing: '+ this.props.info);
  //   var datax = this.props.info;
  //   this.drawGraph('hello');
  // },



  render: function() {
    if (this.props.info) {
      console.log('child if: '+ this.props.info);
      this.drawGraph(this.props.info);
    }
		return (
      <section id='chartHere'>TEST</section>
    );
  }
});

