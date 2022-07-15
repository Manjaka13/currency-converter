const https = require("https");
const { baseUrl, currencyApiKey } = require("../helpers/const");

/*
    Service for currency module
*/

const currencyService = {
    getCurrencyList: () => new Promise((resolve, reject) => {
        const options = {
            host: "api.apilayer.com",
            path: "/exchangerates_data/symbols",
            method: "GET",
            headers: {
                "apikey": currencyApiKey
            }
        };

        https.get(options, res => {
            let body = "";
            res.on("data", chunk => {
                body += chunk;
            });
            res.on("end", () => {
                try {
                    resolve(JSON.parse(body).symbols);
                } catch (e) {
                    reject(e);
                }
            });
        }).on("error", (e) => {
            reject(e);
        });
    })
};

module.exports = currencyService;
