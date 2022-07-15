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
            .catch((err) => res.json(failure(err)));
    },

    // Converts currencies
    convert: (req, res) => {
        const { from, to } = req.params;
        if (from && to)
            currency.convert(from, to)
                .then((data) => res.json(success(`Conversion result ${from} => ${to}`, data)))
                .catch((err) => res.json(failure(err)));
        else
            res.json(failure("Please verify your params"));
    }
};

module.exports = mainController;