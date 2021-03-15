import Api from './api/api';
const bootstrapExtensions = require('./extensions');


const models = require('./models'); // imports index file
const config = require('./config/env/config')();

bootstrapExtensions();

models.sequelize.sync().then(() => {
    Api.listen(config.serverPort, () => {
        console.log(`Server listening to port: ${config.serverPort}`);
    });
});

