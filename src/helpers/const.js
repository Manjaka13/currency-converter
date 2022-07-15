/*
    Export constants
*/

const port = process.env.PORT || 3001;
const currencyApiKey = process.env.CURRENCY_API || "";
const baseUrl = process.env.BASE_URL;

module.exports = {
    port,
    currencyApiKey,
    baseUrl
};
