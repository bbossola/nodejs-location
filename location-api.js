var express = require("express");  
var geoip = require('geoip-lite');
var http = require('http');
var countries = require('country-data').countries;
var app = express();

app.get("/api/countries/:ip", function(request, response) {
	var geo = geoip.lookup(request.params.ip);

	var result = {country:{}};
	result.country.language = "en";
	result.country.iso_code = geo.country;
	result.country.name = countries[geo.country].name;
	result.host = request.params.ip;

    response.send(JSON.stringify(result, null, 2));
});                                         


var port = (process.argv.length > 2) ? parseInt(process.argv[2],10) : 9765
app.listen(port, function() {                       
    console.log("Hello service started on port "+port);
});