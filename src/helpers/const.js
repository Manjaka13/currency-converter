/*
    Export constants
*/

const localMode = process.env.LOCAL_MODE || false;
const developmentMode = process.env.DEVELOPMENT;
const port = process.env.PORT || 3001;
const currencyApiKey = process.env.CURRENCY_API || "";
const baseUrl = localMode ? `http://localhost:${port}` : (process.env.BASE_URL || "");

module.exports = {
    localMode,
    developmentMode,
    port,
    currencyApiKey,
    baseUrl
};
