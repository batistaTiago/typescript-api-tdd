const bootstrapArrayExtensions = require('./array');
const bootstrapStringExtensions = require('./string');

module.exports = function() {
    /* @TODO: autoload extensions if possible */
    console.log('Initializing custom extensions');
    bootstrapArrayExtensions();
    console.log('Custom extensions initialized');
}