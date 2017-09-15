var redis = require("redis"),
	client = redis.createClient(),
	express = require("express");
	app = express();

client.on("error", function (err) {
	console.log("Error " + err);
});

if (!Date.now) {
	Date.now = function() { return new Date().getTime(); }
}

// in range
app.get('/coffee/:starttime/:endtime', function(req, res){
	var starttime = req.params.starttime;
	var endtime = req.params.endtime
	if (typeof endtime === "undefined") {
		endtime = Date.now();
	}
	client.multi()
		.zrangebyscore(["coffeeset",starttime,endtime],function(err, results){
		})
		.exec(function (err, replies) {
			res.json({amount: replies[0].length, coffees: replies[0] });
		});
});

app.listen(3000);
