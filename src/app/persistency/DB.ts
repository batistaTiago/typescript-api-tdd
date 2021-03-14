const config = require('../config/env/knex.config');

export default class DB {
    /* singleton to avoid multiple db connections at once */

    private static instance: DB;

    public connection;

    public static getInstance(): DB {
        if (!this.instance) {
            this.instance = new DB();
        }

        return this.instance;
    }


    public static getqueryBuilder() {
        return this.getInstance().connection;
    }

    private constructor() {
        // console.log('#################################')
        // console.log('#################################')
        // console.log('###### CONNECTING TO PGSQL ######')
        // console.log('#################################')
        // console.log('#################################')
        this.connection = require('knex')({
            client: 'pg',
            connection: config.connectionString
        });
    }
}