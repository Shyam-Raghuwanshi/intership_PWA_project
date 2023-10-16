const mongoose = require('mongoose')
const connectDb = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/PWA', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('strictQuery', false)
}
module.exports = connectDb;