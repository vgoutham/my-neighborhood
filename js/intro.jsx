var React = require('react');

var Intro = module.exports = React.createClass({
  render: function() {
    return (
      <article id="intro">
        <h1>myNeighborhood: </h1>
        <p>
          Seattle is known as a city of neighborhoods.Luckily, a ton of data exists about these neighborhoods. However,
          there is no good way to  visualize it... Until now! Using myNeighborhood is easy, just click on the map and
          the data will be displayed below.
        </p>
      </article>
    );
  }
});
