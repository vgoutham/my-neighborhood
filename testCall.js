var request = require('request');
var parseString = require('xml2js').parseString;
var util = require('util');

var hood = 'Ballard';
var url = 'http://www.zillow.com/webservice/GetDemographics.htm?zws-id=' +
            process.env.ZID + '&state=WA&city=Seattle&neighborhood=' + hood;

request(url, function (err, res, body) {
  if (!err && res.statusCode == 200) {
    parseString(body, function (err, res) {
      console.log(util.inspect(res,false,null));
    });
  }
});
