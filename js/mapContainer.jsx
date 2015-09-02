var React = require('react');
var request = require('superagent');
var parseString = require('xml2js').parseString;
var seattleNeighborhoods = require('../data/geojson_cleanedup_remove_median.js');
var config = require('../config.js');


/// data for marker layers
var crimeData = require('../data/seattle_homicide_data.js');
var parkData = require('../data/seattle_park_data.js');

////// child component for D3 charts
var CommuteChart = require('./commuteChart.jsx');
var BuildYearChart = require('./buildYearChart.jsx');
var AgeChart = require('./ageChart.jsx');
var RelationshipChart = require('./relationshipChart.jsx');


var MapContainer = module.exports = React.createClass({

	//	load house median from zillows, transform and update geojson
	loadAllNeighborhoods: function() {
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
						medianObj[name] = median;
					}
					for (var i  = 0; i < seattleNeighborhoods.length; i++) {
						seattleNeighborhoods[i]['median'] = medianObj[seattleNeighborhoods[i]['name']];
					}
					this.setState({
						neighborhoodGeoJson: seattleNeighborhoods
					})
				}.bind(this));
			} else {
				console.log(res.text);
			}
		}.bind(this));
	},
	
	getColor: function(m) {
		m = parseInt(m);
		if(m > 1000000) return '#470015';
		else if(m > 700000)  return '#930000';
		else if(m > 600000)  return '#CC0000';
		else if(m > 500000)  return '#FC4E2A';
		else if(m > 400000)  return '#E5A044';
		else if(m > 300000)  return '#FED976';
		else if(m > 200000)  return '#FFEFAA';
		else return 'grey';
	},

	baseStyle : function(neighborhood) {
		return {
			fillColor : this.getColor(neighborhood.median),
			fillOpacity: 0.5,
			clickable: true,
			weight: 2,
			opacity: 1,
			color: 'grey',
			dashArray: '3'
		};
	},

	//	 initial state. set geojson shape file
	getInitialState: function() {
		return {
			neighborhoodGeoJson: seattleNeighborhoods,
			neighborhoodDetail: ''
		};
	},

	// all layers are placed when component is mounted
	componentDidMount: function() {

		this.loadAllNeighborhoods();
		
	// initiate map layer. Because map is not a DOM element, it doesn't get refreshed so shouldn't live on this.state
		var map = this.map = L.map('map', {
								center: [47.609, -122.332099],
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

	// add attribution
		var attribution = L.control({position: 'bottomright'});
		attribution.onAdd = function(map) {
			var div = L.DomUtil.create('div', 'attribution');
			div.innerHTML = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>;  Crime data &copy 2014 City of Seattle;  Neighborhood data &copy Zillows <img  height="15" src="http://www.zillowstatic.com/vstatic/fb9712c/static/logos/Zillow_Logo_HoodsProvided_RightAligned.gif">';
			return div;
		};
		attribution.addTo(map);

		
	// add legend for choradepth graph
		var legend = L.control({position: 'bottomleft'});
		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
					grades = [200000, 300000, 400000, 500000, 600000, 700000, 1000000],
					gradesLegend = ['200k', '300k', '400k', '500k', '600k', '700k','1M', 'No data'],

					labels = [];
			div.innerHTML = '<h5 margin="0">Zestimate Home Prices</h5>'
			for (var i = 0; i < grades.length; i++) {
				div.innerHTML +=
					'<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
					gradesLegend[i] + (i < grades.length - 1 ? '&ndash;' + gradesLegend[i + 1] + '<br>' : '+' + '<br>');
			}
			div.innerHTML += '<i style="background:' + this.getColor(-1) + '"></i> ' + gradesLegend[i];
			return div;
		}.bind(this);
		legend.addTo(map);

		
	// add a control that display neighborhood name when hovered over
		var info = L.control({position: 'topright'});
		//when add is called, dom will create a div with class info. This is DOM element so an be CSS styled 
		info.onAdd = function(map) {
			this._div = L.DomUtil.create('div', 'info');
			return this._div;
		};
		info.update = function(name) {
			this._div.innerHTML = (name ? '<b>' + name + '</b><br />' : 'Hover over a neighborhood');
		};
		info.addTo(map);
		
		
	// add markerlayer to map
		
		// park data
		var parkIcon = L.icon({
			iconUrl: '../data/pine-48.png',
			iconSize: [15, 25],
			iconAnchor: [22, 49],
			popupAnchor: [-3, -55] // point from which the popup should open relative to the iconAnchor
		});

		var parkMarkers= parkData.map(function(arr) {
					if (!arr[3]) {
						return L.marker([arr[1], arr[0]], {icon: parkIcon}).bindPopup(arr[2]);
					}
					else {
						return L.marker([arr[1], arr[0]], {icon: parkIcon}).bindPopup(arr[2] + arr[3]);
					}
				});

		var newMarkers = L.featureGroup(parkMarkers);
		
		var showPark = false;

		this.parkClickHandler = function(){
			if(!showPark) {
				map.addLayer(newMarkers);
				showPark= true;
			}
			else {
				map.removeLayer(newMarkers);
				showPark= false;
			};
		};


	//			crime button and crime marker functionality
		var crimeMarkers = crimeData.map(function(arr) {
			if (!arr[2]) {
				return L.marker([arr[0], arr[1]]);
			}
			else {
				return	L.marker([arr[0], arr[1]]).bindPopup("date: " + '</br>' + arr[2].slice(0,10));
			}
		});

		var crimeMarkers = L.featureGroup(crimeMarkers);

		var showCrime = false;

		this.crimeClickHandler = function(){
			if(!showCrime) {
				map.addLayer(crimeMarkers);
				showCrime= true;
			}
			else {
				map.removeLayer(crimeMarkers);
				showCrime= false;
			};
		};


		//add style layer and event listener. delay loading until data is ready because map will not be refreshed when this.state changes
		setTimeout(function(){
			
			// using globals to track what have been selected
			var selected;
			var previousSelected;
			
			var hoverOverStyle = function(e) {
				var layer = e.target;
				if (!selected || layer._leaflet_id !== selected._leaflet_id) {
					layer.setStyle({
						weight: 3,
						color: '#fff',
						dashArray: '',
						fillOpacity: 0.7
					});
				}
				info.update(layer.feature.geometry.name);
				if (!L.Browser.ie && !L.Browser.opera) {
					layer.bringToFront();
				}
			};

			var resetHighlight = function(e) {
				var layer = e.target;
				if (!selected || layer._leaflet_id !== selected._leaflet_id) {
					geojson.resetStyle(layer);
				}
				info.update();
			};

			var clickStyle = function(e) {
				var layer = e.target;
				if (selected) {
					previousSelected = selected;
					geojson.resetStyle(previousSelected);
				}
				selected = layer;
				layer.setStyle({
					weight: 4,
					color: '#FFFF00 ',
					dashArray: '',
					fillOpacity: 0.7
				});
			};

			// update clicked-on neighborhood and Ajax call to fetch zillows data
			var zoomToFeature = function(e) {
				map.fitBounds(e.target.getBounds());
				clickStyle(e);
				var name = e.target.feature.geometry.name;
				var zillowName = name.replace(/\s+/g, '');
				request
					.get('/' + zillowName)
					.end(function(err, res) {
					if (res.ok) {
						parseString(res.text, function(err, result) {
							this.setState({
								neighborhoodDetail: result
							});
						}.bind(this));
					} else {
						console.log(res.text);
					}
				}.bind(this));
			}.bind(this);

			// register function to eventlistener
			var onEachFeature = function (feature, layer) {
				layer.on({
					click: zoomToFeature
				});
				layer.on({
					mouseover: hoverOverStyle,
					mouseout: resetHighlight,
				});
			};

			// base geojson layer with chromadepth graph
			var geojson = this.state.neighborhoodGeoJson.map(function(neighborhood) {
				L.geoJson(neighborhood, {
					style: this.baseStyle(neighborhood)
				}).addTo(map);
			}.bind(this));

			// register eventlister to each feature layer
			geojson = L.geoJson(this.state.neighborhoodGeoJson, {
				style: this.baseStyle,
				onEachFeature: onEachFeature
			}).addTo(map);

		}.bind(this), 800)
	},

	render: function() {
		return (
			<div id='mapWrapper'>
				<div id='map'>
					<div id='buttonWrapper'>
						<button id='parkButton' onClick={this.parkClickHandler}></button>
						<button id='crimeButton' onClick={this.crimeClickHandler}></button>
					</div>
					<RelationshipChart info={this.state.neighborhoodDetail} />
					<BuildYearChart info={this.state.neighborhoodDetail} />
					<AgeChart info={this.state.neighborhoodDetail} />
					<CommuteChart info={this.state.neighborhoodDetail} />
				</div>
 			</div>
		);
	}

});
