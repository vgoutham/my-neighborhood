var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var parseString = require('xml2js').parseString;
var request = require('superagent');

var ZID = require('./config.js').ZID;

app.use(express.static(__dirname));

app.get('/neighborhoods', function(req, res) {
	var url = 'http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=' + ZID + '&state=wa&city=seattle&childtype=neighborhood';
	request
		.get(url)
		.end(function(err, data) {
			if (err) {
				console.log(err);
			} else {
				res.send(data.text);
			}
		})
});

app.get('/:name', function(req, res) {
  var name = req.params.name;
  var url = 'http://www.zillow.com/webservice/GetDemographics.htm?zws-id=' + ZID + '&state=WA&city=Seattle&neighborhood=' + name;
  request
  .get(url)
  .end(function(err,data) {
    if (err) {
      console.log('err', err);
    }
    res.send(data.text);
  });
});


app.listen(PORT, function() {
  console.log('\nServer is running on port ' + PORT + '.....\n');
});
