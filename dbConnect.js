const mongoose = require('mongoose');

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DATABASE CONNECTED SUCCESSFULLY!');
  });
};

module.exports = connectDb;
