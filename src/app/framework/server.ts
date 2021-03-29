import api from "./api/api";

(function () {
    const bootstrapExtensions = require('./extensions');

    const models = require('./models'); // imports index file
    const config = require('./config/env/sequelize.config')();

    bootstrapExtensions();

    models.sequelize.sync().then(() => {
        api.listen(config.serverPort, () => {
            console.log(`Server listening to port: ${config.serverPort}`);
        });
    });
})();
