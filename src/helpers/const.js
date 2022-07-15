/*
    Export constants
*/

const developmentMode = process.env.DEVELOPMENT;
const port = process.env.PORT || 3001;
const currencyApiKey = process.env.CURRENCY_API || "";
const baseUrl = process.env.BASE_URL || "";

module.exports = {
    developmentMode,
    port,
    currencyApiKey,
    baseUrl
};
