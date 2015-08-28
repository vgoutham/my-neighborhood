var React = require('react');

var RelationshipChart = module.exports = React.createClass({

  counter: 0,

  drawGraph: function(datax) {

    var relationshipStatus = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[4].data[0].attribute;

    var dataArr = [];
    for (var i = 0; i < 6; i++) {
      dataArr.push({
        itemLabel: relationshipStatus[i].name[0],
        itemValue: Math.round(relationshipStatus[i].value[0]._ * 100)
      });
    }

    var dataStructure = [{"data": dataArr}];
    var div = d3.select("body").append("div").attr("class", "toolTip");

    var w = 450;
    var h = 300;
    var r = 100;
    var ir = 70;
    var textOffset = 24;
    var tweenDuration = 750;

    //OBJECTS TO BE POPULATED WITH DATA LATER
    var lines, valueLabels, nameLabels;
    var pieData = [];
    var oldPieData = [];
    var filteredPieData = [];

    //D3 helper function to populate pie slice parameters from array data
    var donut = d3.layout.pie().value(function(d){
      return d.itemValue;
    });

    //D3 helper function to create colors from an ordinal scale
    var color = d3.scale.category20c();

    //D3 helper function to draw arcs, populates parameter "d" in path object
    var arc = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(ir)
      .outerRadius(r);

    // CREATE VIS & GROUPS ////////////////////////////////////
    ///////////////////////////////////////////////////////////

    var vis = d3.select("#relationshipContainer").append("svg:svg")
      .attr("id", "relation")
      .attr("width", w)
      .attr("height", h);

    //GROUP FOR ARCS/PATHS
    var arc_group = vis.append("svg:g")
      .attr("class", "arc")
      .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

    //GROUP FOR LABELS
    var label_group = vis.append("svg:g")
      .attr("class", "label_group")
      .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

    //GROUP FOR CENTER TEXT
    var center_group = vis.append("svg:g")
      .attr("class", "center_group")
      .attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

    ///////////////////////////////////////////////////////////
    // CENTER TEXT ////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    //svg.append('text')
    //  .attr('dy', '0')
    //  .style('text-anchor', 'middle')
    //  .attr('class', 'center-group')
    //  .text(function(d) { return 'Age Distribution'; });


    //WHITE CIRCLE BEHIND LABELS
    var whiteCircle = center_group.append("svg:circle")
      .attr("fill-opacity", 0)
      .attr("r", ir)



    ///////////////////////////////////////////////////////////
    // STREAKER CONNECTION ////////////////////////////////////
    ///////////////////////////////////////////////////////////

    // to run each time data is generated
    function update(number) {

      data = dataStructure[number].data;

      oldPieData = filteredPieData;
      pieData = donut(data);

      var sliceProportion = 0; //size of this slice
      filteredPieData = pieData.filter(filterData);
      function filterData(element, index, array) {
        element.name = data[index].itemLabel;
        element.value = data[index].itemValue;
        sliceProportion += element.value;
        return (element.value > 0);
      }

        //DRAW ARC PATHS
        paths = arc_group.selectAll("path").data(filteredPieData);
        paths.enter().append("svg:path")
          .attr("stroke", "black")
          .attr("stroke-width", 0.5)
          .attr("fill", function(d, i) { return color(i); })
          .transition()
            .duration(tweenDuration)
            .attrTween("d", pieTween);
        paths
          .transition()
            .duration(tweenDuration)
            .attrTween("d", pieTween);
        paths.exit()
          .transition()
            .duration(tweenDuration)
            .attrTween("d", removePieTween)
          .remove();

        //DRAW TICK MARK LINES FOR LABELS
        lines = label_group.selectAll("line").data(filteredPieData);
        lines.enter().append("svg:line")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", -r-3)
          .attr("y2", -r-15)
          .attr("stroke", "gray")
          .attr("transform", function(d) {
            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
          });
        lines.transition()
          .duration(tweenDuration)
          .attr("transform", function(d) {
            return "rotate(" + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ")";
          });
        lines.exit().remove();

        //DRAW LABELS WITH PERCENTAGE VALUES
        valueLabels = label_group.selectAll("text.value").data(filteredPieData)
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return "beginning";
            } else {
              return "end";
            }
          })
          .text(function(d){
            var percentage = (d.value/sliceProportion)*100;
            return percentage.toFixed(1) + "%";
          });

        valueLabels.enter().append("svg:text")
          .attr("class", "value")
          .attr("transform", function(d) {
            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
          })
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function(d){
            if ( (d.startAngle+d.endAngle)/2 < Math.PI ){
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            var percentage = (d.value/sliceProportion)*100;
            return percentage.toFixed(1) + "%";
          });

        valueLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

        valueLabels.exit().remove();

        //DRAW LABELS WITH ENTITY NAMES
        nameLabels = label_group.selectAll("text.units").data(filteredPieData)
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 17;
            } else {
              return 5;
            }
          })
          .attr("text-anchor", function(d) {
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels.enter().append("svg:text")
          .attr("class", "units")
          .attr("transform", function(d) {
            return "translate(" + Math.cos(((d.startAngle+d.endAngle - Math.PI)/2)) * (r+textOffset) + "," + Math.sin((d.startAngle+d.endAngle - Math.PI)/2) * (r+textOffset) + ")";
          })
          .attr("dy", function(d){
            if ((d.startAngle+d.endAngle)/2 > Math.PI/2 && (d.startAngle+d.endAngle)/2 < Math.PI*1.5 ) {
              return 17;
            } else {
              return 5;
            }
          })
          .attr("text-anchor", function(d){
            if ((d.startAngle+d.endAngle)/2 < Math.PI ) {
              return "beginning";
            } else {
              return "end";
            }
          }).text(function(d){
            return d.name;
          });

        nameLabels.transition().duration(tweenDuration).attrTween("transform", textTween);

        nameLabels.exit().remove();

    }

    ///////////////////////////////////////////////////////////
    // FUNCTIONS //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    // Interpolate the arcs in data space.
    function pieTween(d, i) {
      var s0;
      var e0;
      if(oldPieData[i]){
        s0 = oldPieData[i].startAngle;
        e0 = oldPieData[i].endAngle;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        s0 = oldPieData[i-1].endAngle;
        e0 = oldPieData[i-1].endAngle;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
        s0 = oldPieData[oldPieData.length-1].endAngle;
        e0 = oldPieData[oldPieData.length-1].endAngle;
      } else {
        s0 = 0;
        e0 = 0;
      }
      var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
      return function(t) {
        var b = i(t);
        return arc(b);
      };
    }

    function removePieTween(d, i) {
      s0 = 2 * Math.PI;
      e0 = 2 * Math.PI;
      var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
      return function(t) {
        var b = i(t);
        return arc(b);
      };
    }

    function textTween(d, i) {
      var a;
      if(oldPieData[i]){
        a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
      } else if (!(oldPieData[i]) && oldPieData[i-1]) {
        a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
      } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
        a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
      } else {
        a = 0;
      }
      var b = (d.startAngle + d.endAngle - Math.PI)/2;

      var fn = d3.interpolateNumber(a, b);
      return function(t) {
        var val = fn(t);
        return "translate(" + Math.cos(val) * (r+textOffset) + "," + Math.sin(val) * (r+textOffset) + ")";
      };
    }

    update(0);

    this.counter += 1;
  },

  updateGraph: function(datax) {

  /* ------- PIE SLICES -------*/
    var relationshipStatuss = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[1].data[0].attribute;

    var dataArr = [];
    for (var i = 0; i < relationshipStatuss.length; i++) {
      dataArr.push({
        name: relationshipStatuss[i].name[0],
        val: Math.round(relationshipStatuss[i].value[0]._ * 100)
      });
    }

  var slice = svg.select(".slices").selectAll("path.slice")
    .data(pie(dataArr), key);

  slice.enter()
    .insert("path")
    .style("fill", function(d) { return color(d.data.label); })
    .attr("class", "slice");

  slice
    .transition().duration(1000)
    .attrTween("d", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    })

  slice.exit()
    .remove();

  },


  render: function() {
    if (this.props.info && this.counter ==0) {
      this.drawGraph(this.props.info);
    }
    if (this.props.info && this.counter > 0) {
      d3.select("#relation")
       .remove();
      this.drawGraph(this.props.info);
    }
    return(
      <article id='relationshipChart'></article>
    );
  }
});
