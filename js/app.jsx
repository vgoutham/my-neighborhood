var React = require('react');

var Header = require('./header.jsx');
var MapContainer = require('./mapContainer.jsx');

var App = React.createClass({
	render: function() {
		return (
			<main>
  			<MapContainer />
			</main>
		)
	}
});

React.render(<App appName="MyHood" />, document.getElementById('content'));
