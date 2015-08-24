var React = require('react');

var Header = require('./header.jsx');
MapContainer = require('./mapContainer.jsx');

var App = React.createClass({
	render: function() {
		return (
			<main>
			<Header />
			<MapContainer />
			</main>
		)
	}
});

React.render(<App appName="MyHood" />, document.body);

