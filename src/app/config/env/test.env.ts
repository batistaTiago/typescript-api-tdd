module.exports = {
    env: 'test',
    db: 'api_database_tests',
    dialect: 'postgres',
    username: 'postgres',
    password: 'pg_password',
    host: 'localhost',
    serverPort: 3000,
    pgPort: 5432,
    dbUrl: 'postgres://postgres:pgroot@localhost:5432/api_database_tests',
    secret: 'super_secret_key'
}