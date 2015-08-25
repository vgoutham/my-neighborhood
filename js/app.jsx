var React = require('react');

var Header = require('./header.jsx');
var MapContainer = require('./mapContainer.jsx');
var ChartContainer = require('./chartContainer.jsx');

var App = React.createClass({
	render: function() {
		return (
			<main>
  			<MapContainer />
        <ChartContainer />
			</main>
		)
	}
});

React.render(<App appName="MyHood" />, document.getElementById('content'));

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
  var name = e.target.feature.geometry.name;
  var zillowName = name.replace(/\s+/g, '');
  request
  .get('/name')
  .end(function(err, res) {
    if(err) {
      console.log(err);
    }
    console.log(res);
    parseString(res.text, function (err, myData) {
      if (err) {
        console.log(err);
      }
      var jsonData = JSON.stringify(myData);
      console.log(jsonData);
    });
  });
}
