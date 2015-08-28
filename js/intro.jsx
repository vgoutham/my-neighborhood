var React = require('react');

var Intro = module.exports = React.createClass({
  render: function() {
    return (
      <article id="intro">
        <h1>myNeighborhood: </h1>
        <p>
          Seattle is known as a city of neighborhoods.<br/> Luckily, a ton of data exists <br/> about these neighborhoods. <br/> However,
          there is no good way to <br/> visualize it... Until now!<br/> Using myNeighborhood is easy, <br/> just click on the map and
          the data <br/> will be displayed below.
        </p>
      </article>
    );
  }
});