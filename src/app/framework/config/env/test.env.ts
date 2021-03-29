module.exports = {
    dbName: 'api_database_tests',
    environment: 'development',
    dialect: 'postgres',
    username: 'postgres',
    password: 'pg_password',
    host: 'localhost',
    serverPort: 3000,
    pgPort: 8420,
    dbUrl: `postgres://postgres@localhost:8420/api_database_tests`,
    secret: 'super_secret_key',
    logging: false,
}