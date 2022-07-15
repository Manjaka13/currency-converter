const { success, failure } = require("../services/response");
const currency = require("../services/currency");

/*
    Main controller
*/

const mainController = {
    // Gets currencies
    getCurrencyList: (req, res) => {
        currency.getCurrencyList()
            .then((list) => res.json(success("Currencies list", list)))
            .catch((err) => {
                res.json(failure(err));
                console.log(err)
            });
    }
};

module.exports = mainController;