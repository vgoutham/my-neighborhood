var React = require('react');

var Header = require('./header.jsx');
var MapContainer = require('./mapContainer.jsx');
var ChartContainer = require('./chartContainer.jsx');


var App = React.createClass({
	render: function() {
		return (
			<main>
			<Header />
			<MapContainer />
			<ChartContainer />
			</main>
		)
	}
});

React.render(<App appName="MyHood" />, document.getElementById('content'));


