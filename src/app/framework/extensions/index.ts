const bootstrapArrayExtensions = require('./array');
const bootstrapStringExtensions = require('./string');
// const bootstrapExpressExtensions = require('./express');

module.exports = function() {
    /* @TODO: autoload extensions if possible */
    console.log('Initializing custom extensions');
    bootstrapArrayExtensions();
    // bootstrapExpressExtensions();
    console.log('Custom extensions initialized');
}