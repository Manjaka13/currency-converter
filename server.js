require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const path = require("path");
const app = new Express();
const Currency = require("./currency");
const curr = new Currency();
const port = process.env.PORT || 3300;

//Middlewares
app.use(cors());
app.use(Express.static(path.join(__dirname, "client", "build")));
app.use(Express.json());

//Request a conversion
app.post("/convert", (req, res) => {
	console.log(req.body);
	curr.convert(req.body.amount, req.body.origin, req.body.destination, (err, result) => {
		console.log(err, result);
		if(err)
			res.json(err);
		else
			res.json(result);
	});
});

//List of currencies
app.post("/list", (req, res) => {
	curr.list((err, result) => {
		//console.log(err, result);
		if(err)
			res.json(err);
		else
			res.json(result.results);
	});
});

//Listen
app.listen(port, () => {
	console.log("Currency converter now listening to port " + port);
});