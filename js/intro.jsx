var React = require('react');

var Intro = module.exports = React.createClass({
  render: function() {
    return (
      <article id="intro">
        <h1><img src="../data/favicon.ico"/>myNeighborhood </h1>
        <p>
           Seattle is known as a city of rich culture and great neighborhoods. However, there is no easy way to visualize demographic information at neighborhood level ... Until now! MyNeighborhood compiles data from multiple resources to give you an overview about your neighborhood. Using MyHood is easy, just click on the map and let us show you the data.
        </p>
      </article>
    );
  }
});
