const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projeto-integrador-VI', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
