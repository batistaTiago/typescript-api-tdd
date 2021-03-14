const __env = require(`../env/${process.env.NODE_ENV}.env.js`);

module.exports = {
    connectionString: `${__env.dialect}://${__env.username}:${__env.password}@${__env.host}:${__env.pgPort}/${__env.dbName}`
};

