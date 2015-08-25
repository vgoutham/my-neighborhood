var React = require('react');
var request = require('superagent');
var parseString = require('xml2js').parseString;
var seattleNeighborhoods = require('../data/geojson_cleanedup.js');
var config = require('../config.js');

var MapContainer = module.exports = React.createClass({

	// initial state is only getting data in
	getInitialState: function() {
		return {
			neighborhoodGeoJson: seattleNeighborhoods
		};
	},

	// all layers are placed on component mount
	componentDidMount: function() {

		var map = this.map = L.map(this.getDOMNode(), {
			center: [47.609, -122.332099],
			zoom: 12,
			minZoom: 2,
			maxZoom: 20,
			layers: [
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
					id: 'mobot11.1dba3612',
					accessToken: config.accessToken
				})
			],
			attributionControl: false,
		});


		var getColor = function(m) {
			m = parseInt(m);
			if(m > 1000000) return '#800026';
			else if(m > 6000000)  return '#BD0026';
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
		//allows info control of the dom;
   var info = L.control({position: 'center'});
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

		var highlightFeature = function(e) {
			var layer = e.target;
			layer.setStyle({
				weight: 3,
				color: '#fff',
				dashArray: '',
				fillOpacity: 0.7
			});
			info.update(layer.feature.geometry.name);
			console.log(layer.feature.geometry.name);
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
				if(err) {
					console.log(err);
				}
				console.log(res);
				parseString(res.text, function (err, myData) {
					if (err) {
						console.log(err);
					}
					var jsonData = JSON.stringify(myData);
					console.log(jsonData);
				});
			});
		};

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

		geojson = L.geoJson(seattleNeighborhoods, {
			style: Style,
			onEachFeature: onEachFeature
		}).addTo(map);


	},

	render: function() {
		var style = {height: '60em', width: '60%', position: 'absolute', right: '5em'};
		return (
			<div style={style}></div>
		)
	}

});
