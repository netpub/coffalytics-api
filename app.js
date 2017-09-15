var dash_button = require('node-dash-button');
var dash = dash_button("b4:7c:9c:f5:2e:e8", null, 10000, 'all');
var redis = require("redis"),
	client = redis.createClient();

client.on("error", function (err) {
	console.log("Error " + err);
});

if (!Date.now) {
	Date.now = function() { return new Date().getTime(); }
}

dash.on("detected", function (){
	client.incr('inc', function(err,id){
		var currentDate = Date.now();
		client.zadd("coffeeset", currentDate, currentDate );
	});
});
