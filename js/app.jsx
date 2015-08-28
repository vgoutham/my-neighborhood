var React = require('react');

var Header = require('./header.jsx');
var MapContainer = require('./mapContainer.jsx');
var Intro = require('./intro.jsx');

var App = React.createClass({
	render: function() {
		return (
			<main>
        <Header />
  			<MapContainer />
        <section id='sidebar'>
          <Intro />
        </section>
			</main>
		)
	}
});

React.render(<App appName="MyHood" />, document.getElementById('content'));
