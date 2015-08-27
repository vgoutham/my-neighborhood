var React = require('react');

var Header = require('./header.jsx');
var MapContainer = require('./mapContainer.jsx');
var Footer = require('./footer.jsx');

var App = React.createClass({
	render: function() {
		return (
			<main>
				<Header />
				<MapContainer />
			<Footer />
			</main>
		)
	}
});

React.render(<App appName="MyHood" />, document.getElementById('content'));
