const cors = require('cors');
const config = require('./appConfig');

const corsOptions = {
    origin: config.frontendUrl,
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
