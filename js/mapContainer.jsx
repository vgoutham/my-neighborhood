var React = require('react');
var request = require('superagent');
var parseString = require('xml2js').parseString;
var seattleNeighborhoods = require('../data/geojson_cleanedup_remove_median.js');
var ChartContainer = require('./chartContainer.jsx');
var config = require('../config.js');
var murderData = require('../data/seattle_homicide_data.js');
var easyButton = require('../Leaflet.EasyButton/src/easy-button.js');

var MapContainer = module.exports = React.createClass({

//	load house median from zillows
	loadAllNeighborhoods: function() {
//		console.log('envoked');
		request
			.get('/neighborhoods')
			.end(function(err, res) {
			if (res.ok) {
				parseString(res.text, function(err, result) {
					var outputArr = result['RegionChildren:regionchildren']['response'][0]['list'][0]['region'];
					var medianObj = {},
							name = '',
							median = null;
					for(var j = 0; j < outputArr.length; j++) {
						name = outputArr[j]['name'][0];
						if (outputArr[j].hasOwnProperty('zindex')) {
							median = outputArr[j]['zindex'][0]._;
						} else {
							median = null;
						}
//						console.log(name, median);
						medianObj[name] = median;
					}
					for (var i  = 0; i < seattleNeighborhoods.length; i++) {
						seattleNeighborhoods[i]['median'] = medianObj[seattleNeighborhoods[i]['name']];
					}
					this.setState({
						neighborhoodGeoJson: seattleNeighborhoods
					})
//					this.resetStyle(Style, onEachFeature);
//					console.log('this.state.neighborhoodGeoJon', this.state.neighborhoodGeoJson[0]);
				}.bind(this));
			} else {
				console.log(res.text);
			}
		}.bind(this));
	},

//	 initial state. set geojson
	getInitialState: function() {
		return {
			neighborhoodGeoJson: seattleNeighborhoods,
			neighborhoodDetail: ''
		};
	},

	// all layers are placed when component is mounted
	componentDidMount: function() {

		//load midian
		this.loadAllNeighborhoods();
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



var crimeEvent = document.getElementById('crimeButton');
crimeEvent.addEventListener('click', clickHandler, false);
var murderMarkers = murderData.map(function(arr) {
	return	L.marker(arr).bindPopup("Homicide");
});

var clicked = false;
var mapMarkers = L.featureGroup(murderMarkers);
	function clickHandler() {
		var btn = document.getElementById('crimeButton');
		if (clicked === false) {
		map.addLayer(mapMarkers);
		btn.innerHTML = 'Hide Seattle Homicides';
		clicked = true;
	}
	else {
		console.log(mapMarkers);
		map.removeLayer(mapMarkers);
		btn.innerHTML = 'Show Seattle Homicides';
		clicked = false;
	 }
	}

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
					gradesLegend = [0, '100k', '200k', '300k', '400k', '500k', '600k', '1M', 'No data'],
					labels = [];
			// loop through our density intervals and generate a label with a colored square for each interval
			div.innerHTML = '<h5 margin="0">Median Home Prices</h5>'
			for (var i = 0; i < grades.length; i++) {
				div.innerHTML +=
					'<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
					gradesLegend[i] + (i < grades.length - 1 ? '&ndash;' + gradesLegend[i + 1] + '<br>' : '+' + '<br>');
			}
			div.innerHTML += '<i style="background:' + getColor(-1) + '"></i> ' + gradesLegend[i];
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




//		add style layer and event listener
		setTimeout(function(){
			console.log('this.state.neighborhoodGeoJon', this.state.neighborhoodGeoJson[0]);
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
			var geojson = this.state.neighborhoodGeoJson.map(function(neighborhood) {
				L.geoJson(neighborhood, {
					style: Style(neighborhood)
				}).addTo(map);
			});

			geojson = L.geoJson(this.state.neighborhoodGeoJson, {
				style: Style,
				onEachFeature: onEachFeature
			}).addTo(map);

		}.bind(this), 300)


	},

	render: function() {
		return (
			<div id="mapStyle">
				<ChartContainer info={this.state.neighborhoodDetail} />
			</div>
		)
	}

});
