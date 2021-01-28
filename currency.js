var https = require("https");

class Currency {
	constructor() {
		this.api_key = process.env.CURRENCY_API_KEY || "";
	}

	//Request conversion
	convert(amount, currency_origin, currency_destination, callback) {
		const query = encodeURIComponent(currency_origin) + "_" + encodeURIComponent(currency_destination);
		const url = "https://free.currconv.com/api/v7/convert?q=" + query + "&compact=ultra&apiKey=" + this.api_key;

	  	https.get(url, res => {
	  		let body = "";
			res.on("data", chunk => {
				body += chunk;
			});
			res.on("end", () => {
				try {
					const jsonObj = JSON.parse(body);
					const val = jsonObj[query];
					if(val)
						callback(null, val * amount);
					else {
						var err = new Error("Value not found for " + query);
						//console.log(err);
						callback(err);
					}
				} catch(e) {
					//console.log("Parse error: ", e);
					callback(e);
				}
			});
		}).on("error", e => {
			//console.log("Got an error: ", e);
			callback(e);
	  	});
	}

	//Get currency list
	list(callback) {
		const url = "https://free.currconv.com/api/v7/currencies?apiKey=" + this.api_key;

	  	https.get(url, res => {
	  		let body = "";
			res.on("data", chunk => {
				body += chunk;
			});
			res.on("end", () => {
				try {
					callback(null, JSON.parse(body))
				} catch(e) {
					callback(e);
				}
			});
		}).on("error", e => {
			callback(e);
	  	});
	}
}

module.exports = Currency;