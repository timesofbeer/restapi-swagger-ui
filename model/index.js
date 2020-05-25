const mongoose = require('mongoose');
const env =require('dotenv').config();
const connectionkey=process.env.dbconnectionkey;
console.log(connectionkey)
mongoose.connect(connectionkey, { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)

    console.log("Successfully connected to Database");
});

module.exports = {
    polls: require('./polls'),
    user: require('./user')
}
