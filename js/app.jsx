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
          <div id='allGraphsContainer'>
            <h1 id='hoodName'></h1>
            <h4 id='hoodIncome'></h4>
            <article className='graphWrap' id='relationshipContainer'>
              <h1>Relationship Status</h1>
            </article>
            <article className='graphWrap' id='buildYearContainer'>
              <h1>Year Built</h1>
            </article>
            <article className='graphWrap' id='ageContainer'>
              <h1>Age Distribution</h1>
            </article>
            <article className='graphWrap' id='commuteContainer'>
              <h1>Average Commute Time</h1>
            </article>
          </div>
        </section>
			</main>
		)
	}
});

React.render(<App appName="MyHood" />, document.getElementById('content'));
