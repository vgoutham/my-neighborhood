var React = require('react');
var request = require('superagent');
var parseString = require('xml2js').parseString;
var seattleNeighborhoods = require('../data/geojson_cleanedup.js');
var ChartContainer = require('./chartContainer.jsx');
var config = require('../config.js');

var MapContainer = module.exports = React.createClass({

	//load house median from zillows
	loadAllNeighborhoods: function() {
		request
			.get('/neighborhoods')
			.end(function(err, res) {
			if (res.ok) {
				parseString(res.text, function(err, result) {
					var output = result['RegionChildren:regionchildren']['response'];
					//					console.log(output);
					this.setState({
						test: this.state.test = output
					})
				}.bind(this));
			} else {
				console.log(res.text);
			}
		}.bind(this));
	},

	// initial state. set geojson
	getInitialState: function() {
		return {
			neighborhoodGeoJson: seattleNeighborhoods,
			test: {},
			neighborhoodDetail: ''
		};
	},

	// all layers are placed when component is mounted
	componentDidMount: function() {
		//map layer
		var map = this.map = L.map(this.getDOMNode(), {
			center: [47.65, -122.34],
			zoom: 12,
			minZoom: 2,
			maxZoom: 13,
			layers: [
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
					id: 'mobot11.1dba3612',
					accessToken: config.accessToken
				})
			],
			attributionControl: false,
		});

		//load median house price
		this.loadAllNeighborhoods();

		//add style to tiles
		var getColor = function(m) {
			m = parseInt(m);
			if(m > 1000000) return '#800026';
			else if(m > 600000)  return '#BD0026';
			else if(m > 500000)  return '#E31A1C';
			else if(m > 400000)  return '#FC4E2A';
			else if(m > 300000)  return '#FD8D3C';
			else if(m > 200000)  return '#FEB24C';
			else if(m > 100000)  return '#FED976';
			else if(m > 0)  return '#FFEDA0';
			else return 'grey';
		};

		var Style = function(neighborhood) {
			return {
				fillColor : getColor(neighborhood.median),
				fillOpacity: 0.5,
				clickable: true,
				weight: 2,
				opacity: 1,
				color: 'grey',
				dashArray: '3'
			};
		};
		legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
					grades = [0, 100000, 200000, 300000, 400000, 500000, 600000, 1000000],
					labels = [];
			// loop through our density intervals and generate a label with a colored square for each interval
			div.innerHTML = '<h6 margin="0">Median Home Prices</h6>'
			for (var i = 0; i < grades.length; i++) {
				div.innerHTML +=
					'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
					grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			}
			return div;
		};
		legend.addTo(map);
		//allows info control of the dom;

		var info = L.control();
		//when add is called, dom will create a div with id info
		info.onAdd = function(map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function(props) {
			this._div.innerHTML = (props ? '<b>' + props + '</b><br />' : 'Hover over a neighborhood');
		};
		info.addTo(map);

		//add event listeners
		var highlightFeature = function(e) {
			var layer = e.target;
			layer.setStyle({
				weight: 3,
				color: '#fff',
				dashArray: '',
				fillOpacity: 0.7
			});
			info.update(layer.feature.geometry.name);
			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}
		};

		var resetHighlight = function(e) {
			geojson.resetStyle(e.target);
			info.update();
		};

		var zoomToFeature = function(e) {
			map.fitBounds(e.target.getBounds());
			var name = e.target.feature.geometry.name;
			console.log(name);
			var zillowName = name.replace(/\s+/g, '');
			request
				.get('/' + zillowName)
				.end(function(err, res) {
				if (res.ok) {
					parseString(res.text, function(err, result) {
						this.setState({
							neighborhoodDetail: result
						})
					}.bind(this));
				} else {
					console.log(res.text);
				}
			}.bind(this));
		}.bind(this);


		var onEachFeature = function (feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature // need to add http call here
			});
		};

		//add style layer
		var geojson = this.state.neighborhoodGeoJson.map(function(neighborhood) {
			L.geoJson(neighborhood, {
				style: Style(neighborhood)
			}).addTo(map);
		});

		geojson = L.geoJson(seattleNeighborhoods, {
			style: Style,
			onEachFeature: onEachFeature
		}).addTo(map);

	},

	render: function() {
		console.log('info on parent', this.state.neighborhoodDetail);
		
		return (
			<div id="mapStyle">
				<ChartContainer info={this.state.neighborhoodDetail} />
			</div>
		)
	}

});