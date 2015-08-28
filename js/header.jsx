var React = require('react');

var Header = module.exports = React.createClass({
	render: function() {
		return (
			<header>
        <h1>myNeighborhood</h1>
  			<a href="https://github.com/gouthamvreddy/my-neighborhood" target="_blank">
          <img src="../data/myhoodlogo.png" />
        </a>
			</header>
		)
	}
});
