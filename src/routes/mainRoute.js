const router = require("express").Router();
const { getCurrencyList } = require("../controllers/mainController");

/*
    Main route
*/

router.get("/list", getCurrencyList);

module.exports = { path: "/", router };
