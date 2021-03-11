import Api from './api/api';

const config = require('./config/env/config')();

Api.listen(config.serverPort, () => {
    console.log(`Server listening to port: ${config.serverPort}`);
});