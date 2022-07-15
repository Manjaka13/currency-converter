// Get env
require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const { port } = require("./helpers/const");
const mainRoute = require("./routes/mainRoute");
const jsonCheck = require("./middlewares/jsonCheck");
const notFoundCheck = require("./middlewares/notFoundCheck");

/*
    Server entry point
*/

// Setup server
const app = Express();

// Apply middlewares
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(jsonCheck);

// Setup routes
app.use(mainRoute.path, mainRoute.router);
app.use(notFoundCheck);

// Connects to database
// Awaiting for incoming request
app.listen(port, () => {
    console.log(`Currency running on port ${port}`);
});
