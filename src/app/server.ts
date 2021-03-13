import Api from './api/api';

const models = require('./models'); // imports index file
const config = require('./config/env/config')();

models.sequelize.sync().then(() => {
    Api.listen(config.serverPort, () => {
        console.log(`Server listening to port: ${config.serverPort}`);
    });
});

