var React = require('react');

var seattleNeighborhoods = require('../data/geojson_cleanedup.js');
var config = require('../config.js');

var MapContainer = module.exports = React.createClass({

	getInitialState: function() {
		return {
			neighborhoodGeoJson: seattleNeighborhoods
		}
	},
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
										accessToken: config.Mapbox_token
									})
			],
			attributionControl: false,
		});



	},

//	getColor: function(m) {
//		m = parseInt(m);
//		if(m > 1000000) return '#800026';
//		else if(m > 6000000)  return '#BD0026';
//		else if(m > 500000)  return '#E31A1C';
//		else if(m > 400000)  return '#FC4E2A';
//		else if(m > 300000)  return '#FD8D3C';
//		else if(m > 200000)  return '#FEB24C';
//		else if(m > 100000)  return '#FED976';
//		else if(m > 0)  return '#FFEDA0';
//		else return 'grey';
//	},
//
	Style: function(neighborhood) {
		return {
			fillColor : getColor(neighborhood.median),
			fillOpacity: 0.5,
			clickable: true,
			weight: 2,
			opacity: 1,
			color: 'grey',
			dashArray: '3'
		}
	},
//
	addGeojsonLayer : function() {
		this.state.seattleNeighborhoods.map(function(neighborhood) {
			L.geoJson(neighborhood, {
				style: Style(neighborhood)
			}).addTo(map);
		})
	},
//
//	highlightFeature: function(e) {
//		var layer = e.target;
//		layer.setStyle({
//			weight: 3,
//			color: '#fff',
//			dashArray: '',
//			fillOpacity: 0.7
//		});
//		if (!L.Browser.ie && !L.Browser.opera) {
//			layer.bringToFront();
//		}
//	},
//
//	resetHighlight: function(e) {
//		geojson.resetStyle(e.target);
//	},
//
//	zoomToFeature: function(e) {
//		map.fitBounds(e.target.getBounds());
//	},
//
//	onEachFeature: function (feature, layer) {
//		layer.on({
//			mouseover: this.highlightFeature,
//			mouseout: this.resetHighlight,
////			click: zoomToFeature // need to add http call here
//		});
//	},
//
//	geojson = L.geoJson(seattleNeighborhoods, {
//		style: this.Style,
//		onEachFeature: this.onEachFeature
//	}).addTo(map);
//

	//	componentWillUnmount: function() {
	//		this.map.off('click', this.onMapClick);
	//		this.map = null;
	//	},
	//
//	onMapClick: function() {
//		console.log('clicked');
//		// Do some wonderful map things...
//	},



	render: function() {
		var style = {height: '50em'};
		return (
			<div style={style}></div>
		)
	}

});





//var map = L.map('map').setView([47.609, -122.332099], 12);
//var seattleNeighborhoods = require('../data/geojson_cleanedup.js');
//var config = require('../config/config.js');
//
//// load a tile layer
//var baseMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//    maxZoom: 18,
//    id: 'mobot11.1dba3612',
//	accessToken: config.Mapbox_token
//}).addTo(map);
//
//var baseMaps = {
//	"Basemap": baseMap
//};
//
//
//function getColor(m) {
//	m = parseInt(m);
//	if(m > 1000000) return '#800026';
//	else if(m > 6000000)  return '#BD0026';
//	else if(m > 500000)  return '#E31A1C';
//	else if(m > 400000)  return '#FC4E2A';
//	else if(m > 300000)  return '#FD8D3C';
//	else if(m > 200000)  return '#FEB24C';
//	else if(m > 100000)  return '#FED976';
//	else if(m > 0)  return '#FFEDA0';
//	else return 'grey';
//}
//
//function Style(neighborhood) {
//	return {
//		fillColor : getColor(neighborhood.median),
//		fillOpacity: 0.5,
//		clickable: true,
//		weight: 2,
//		opacity: 1,
//		color: 'grey',
//		dashArray: '3'
//	}
//}
//
//var geojson = seattleNeighborhoods.map(function(neighborhood) {
//	L.geoJson(neighborhood, {
//		style: Style(neighborhood)
//	}).addTo(map);
//});
//
//function highlightFeature(e) {
//	var layer = e.target;
//	layer.setStyle({
//		weight: 3,
//		color: '#fff',
//		dashArray: '',
//		fillOpacity: 0.7
//	});
//	if (!L.Browser.ie && !L.Browser.opera) {
//		layer.bringToFront();
//	}
//}
//
//function resetHighlight(e) {
//	geojson.resetStyle(e.target);
//}
//
//function zoomToFeature(e) {
//	map.fitBounds(e.target.getBounds());
//}
//
//function onEachFeature(feature, layer) {
//	layer.on({
//		mouseover: highlightFeature,
//		mouseout: resetHighlight,
//		click: zoomToFeature // need to add http call here
//	});
//}
//
//geojson = L.geoJson(seattleNeighborhoods, {
//	style: Style,
//	onEachFeature: onEachFeature
//}).addTo(map);
//
//
