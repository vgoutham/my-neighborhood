var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.port || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));


// app.get('', function(req, res) {
//
// });



app.listen(process.env.port || port, function() {
  console.log('server is running on port ' + port)
});
