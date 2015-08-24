var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.port || 3000;
var ZID = require('./config.js').ZID;
var parseString = require('xml2js').parseString;
var util = require('util');
var request = require('superagent');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));


app.get('/:name', function(req, res) {
  var name = req.params.name;
  var url = 'http://www.zillow.com/webservice/GetDemographics.htm?zws-id=' + ZID + '&state=WA&city=Seattle&neighborhood=' + name;
  request
  .get(url)
  .end(function(err,data) {
    if (err) {
      console.log(err);
    }
    res.send(data.text);
  });
});



app.listen(process.env.port || port, function() {
  console.log('server is running on port ' + port);
});
