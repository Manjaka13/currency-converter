const router = require("express").Router();
const { getCurrencyList, convert } = require("../controllers/mainController");

/*
    Main route
*/

router.get("/list", getCurrencyList);
router.get("/convert/:from/:to", convert);

module.exports = { path: "/", router };
