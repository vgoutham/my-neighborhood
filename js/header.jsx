var React = require('react');

var Header = module.exports = React.createClass({
	render: function() {
		return (
			<header>
			<article>MyHood</article>
			<ul>
			<li>&copy; 2015 MyHood</li>
			<li><a href="https://github.com/gouthamvreddy/my-neighborhood"><img src="../data/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png" /></a></li>
			</ul>
			</header>
		)
	}
});