const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Authentication-jwt', {
  useMongoClient: true
}, () => {
  console.log('Database is running');
});
