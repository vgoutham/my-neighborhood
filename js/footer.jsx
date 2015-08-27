var React = require('react');

var Footer = module.exports = React.createClass({
	render: function() {
		return (
			<footer>
				<nav>
				<article>&copy 2015 MyHood</article>
				<a href="https://github.com/gouthamvreddy/my-neighborhood"><img src="../data/GitHub-Mark/PNG/GitHub-Mark-32px.png" /></a>
				<a href=""><img src="../data/heroku_icon_32x32.png" /></a>
			</nav>
			</footer>
		)
	}
});