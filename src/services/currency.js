const https = require("https");
const { baseUrl, currencyApiKey } = require("../helpers/const");

/*
    Service for currency module
*/

const currencyService = {
    // get list of currencies
    getCurrencyList: () => new Promise((resolve, reject) => {
        const options = {
            host: baseUrl,
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
    }),

    // Converts two currencies
    convert: (from, to) => new Promise((resolve, reject) => {
        const options = {
            host: baseUrl,
            path: `/exchangerates_data/convert?to=${to}&from=${from}&amount=1`,
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
                    resolve(JSON.parse(body).result);
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
