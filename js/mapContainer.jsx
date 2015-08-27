var React = require('react');
var request = require('superagent');
var parseString = require('xml2js').parseString;
var seattleNeighborhoods = require('../data/geojson_cleanedup_remove_median.js');
var config = require('../config.js');
var murderData = require('../data/seattle_homicide_data.js');
var easyButton = require('../Leaflet.EasyButton/src/easy-button.js');
var MedianChart = require('./medianChart.jsx');
var AgeChart = require('./ageChart.jsx');

var MapContainer = module.exports = React.createClass({

	//	load house median from zillows
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

	//	 initial state. set geojson
	getInitialState: function() {
		return {
			neighborhoodGeoJson: seattleNeighborhoods,
			neighborhoodDetail: ''
		};
	},

	// all layers are placed when component is mounted
	componentDidMount: function() {

		this.loadAllNeighborhoods();
		//map layer
		var map = this.map = L.map(this.getDOMNode(), {
			center: [47.64, -122.24],
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
		
//		add attribution
		var attribution = L.control({position: 'bottomright'});
		attribution.onAdd = function(map) {
			var div = L.DomUtil.create('div', 'attribution');
			div.innerHTML = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>;  Crime data &copy 2014 City of Seattle;  Neighborhood data &copy Zillows <img  height="15" src="http://www.zillowstatic.com/vstatic/fb9712c/static/logos/Zillow_Logo_HoodsProvided_RightAligned.gif">';
			return div;
		};
		attribution.addTo(map);



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

		var legend = L.control({position: 'bottomleft'});

		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
					grades = [0, 100000, 200000, 300000, 400000, 500000, 600000, 1000000],
					gradesLegend = [0, '100k', '200k', '300k', '400k', '500k', '600k', '1M', 'No data'],
					labels = [];
			// loop through our density intervals and generate a label with a colored square for each interval
			div.innerHTML = '<h5> Zestimate Home Value</h5>'
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
		var info = L.control({position: 'topright'});
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


		//		add style layer and event listener. delay loading until data is ready

		setTimeout(function(){

			var selected;
			var previousSelected;


			//			console.log('this.state.neighborhoodGeoJon', this.state.neighborhoodGeoJson[0]);
			var hoverOverStyle = function(e) {
				var layer = e.target;
				if (!selected || layer._leaflet_id !== selected._leaflet_id) {
					layer.setStyle({
						weight: 3,
						color: '#fff',
						dashArray: '',
						fillOpacity: 0.8
					});
				}
				layer.bringToFront();
				info.update(layer.feature.geometry.name);
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
				//				console.log('selected', selected);
				//				console.log('previous', previousSelected);
				layer.setStyle({
					weight: 3,
					color: '#24476B ',
					dashArray: '2',
					zIndex: 1000
				});
				
			};

			var zoomToFeature = function(e) {
				map.fitBounds(e.target.getBounds());
				clickStyle(e);
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
					click: zoomToFeature
				});
				layer.on({
					mouseover: hoverOverStyle,
					mouseout: resetHighlight,
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
				<div id='sidebar'>
					<MedianChart info={this.state.neighborhoodDetail} />
					<AgeChart info={this.state.neighborhoodDetail} />
				</div>
			</div>
		)
	}

});
