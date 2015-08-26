var React = require('react');

var ChartContainer = module.exports = React.createClass({
	render: function() {
		console.log('info on child', this.props.info);
		return (
			<div>
				<div>test chart container</div>
				<div>{this.props.info}</div>
			</div>
		)	
	}
});
