const bootstrapArrayExtensions = require('./array');
const bootstrapStringExtensions = require('./string');

module.exports = function() {
    console.log('Initializing custom extensions');
    bootstrapArrayExtensions();
    console.log('Custom extensions initialized');
}